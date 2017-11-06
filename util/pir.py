import time
import datetime as dt
import os
import sys
import json
import requests
import logging
from logging.handlers import RotatingFileHandler
import secrets


logger = logging.getLogger()
logger.setLevel(logging.INFO)
dirName  = os.path.dirname(os.path.realpath(__file__))
handler = RotatingFileHandler(os.path.join(dirName, 'pir.log'), maxBytes = 20 * 1024 * 1024)
formatter = logging.Formatter('%(asctime)s - %(levelname)s : %(message)s')
handler.setFormatter(formatter);
logger.addHandler(handler)


COOL_DOWN = (60 * 5)

lastPrint = lastMove = dt.datetime.now()
state = -1

def toggleScreen(on):
  if on:
    logger.info("SCREEN ON");
    os.system("service hdmi start")
  else:
    logger.info("SCREEN OFF");
    os.system("service hdmi stop")
  #with open("/sys/class/backlight/rpi_backlight/bl_power", "w") as text_file:
  #  text_file.write(cmd)


def getPirState():
  try:
    response = requests.get('http://' + secrets.HUE_BRIDGE + '/api/' + secrets.USER_ID + '/sensors/13')
    json_data = json.loads(response.text)
    return 1 if json_data['state']['presence'] == True else 0
  except:
    logger.error(sys.exc_info()[0]);
    return 1

while True:
  i = getPirState()
  now = dt.datetime.now()
  if (now - lastPrint).total_seconds() > 20:
    logger.info("state is " + str(i));
    lastPrint = now
  if i == 1:
    lastMove = now
    if state != 1:
      state = 1
      toggleScreen(True)
  elif i == 0 and state != 0 and (now - lastMove).total_seconds() > COOL_DOWN:
    state = 0
    dateTime = now
    toggleScreen(False)

  time.sleep(1.0)
