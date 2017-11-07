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
dirName = os.path.dirname(os.path.realpath(__file__))
handler = RotatingFileHandler(os.path.join(dirName, 'pir.log'), maxBytes=20 * 1024 * 1024)
formatter = logging.Formatter('%(asctime)s - %(levelname)s : %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


COOL_DOWN = (60 * 5)

lastPrint = lastAction = dt.datetime.now()
state = -1

def toggleScreen(on):
  if on:
    logger.info("SCREEN ON")
    os.system("service hdmi start")
  else:
    logger.info("SCREEN OFF")
    os.system("service hdmi stop")
  #with open("/sys/class/backlight/rpi_backlight/bl_power", "w") as text_file:
  #  text_file.write(cmd)

def getPirState():
  try:
    response = requests.get('http://' + secrets.HUE_BRIDGE + '/api/' + secrets.USER_ID + '/sensors/13')
    json_data = json.loads(response.text)
    return json_data['state']['presence'] is True
  except:
    logger.error(sys.exc_info()[0])
    return True


logger.info("*** START ***")
while True:
  now = dt.datetime.now()
  pir = getPirState()

  if (now - lastPrint).total_seconds() > 30:
    logger.info("state - current: " + str(pir) + ", master: " + str(state))
    lastPrint = now

  if pir is True:
    lastAction = now
    if state != 1:
      state = 1
      toggleScreen(True)
  elif pir is False and (now - lastAction).total_seconds() > COOL_DOWN:
    lastAction = now
    state = 0
    toggleScreen(False)

  time.sleep(0.5)
