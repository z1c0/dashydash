import time
import datetime as dt
import os
import sys
import json
import requests
import secrets

COOL_DOWN = (60 * 5)

lastMove = dt.datetime.now()
state = -1

def toggleScreen(on):
  if on:
    print dt.datetime.now(), "ONNNNNNNNNNNNNNNNNNN!"
    os.system("service hdmi start")
  else:
    print dt.datetime.now(), "off"
    os.system("service hdmi stop")
  #with open("/sys/class/backlight/rpi_backlight/bl_power", "w") as text_file:
  #  text_file.write(cmd)


toggleScreen(True)

def getPirState():
  try:
    response = requests.get('http://' + secrets.HUE_BRIDGE + '/api/' + secrets.USER_ID + '/sensors/13')
    json_data = json.loads(response.text)
    return 1 if json_data['state']['presence'] == True else 0
  except:
    print "error ...",  sys.exc_info()[0]
    return 1

while True:
  i = getPirState()
  now = dt.datetime.now()
  #print now, i
  if i == 1:
    lastMove = now
    if state != 1:
      state = 1
      toggleScreen(True)
  elif i == 0 and state == 1 and (now - lastMove).seconds > COOL_DOWN:
    state = 0
    dateTime = now
    toggleScreen(False)

  time.sleep(1.0)
