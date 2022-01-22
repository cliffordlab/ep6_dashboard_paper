"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:40
  Last Modified : 2021-09-18 21:20:40
  Description : This is the file defining the routes for audio services. 
"""

from flask import jsonify, render_template, redirect, request, url_for, current_app
import json
from app import db
from app.audio import blueprint
from app.utils.Database import Database


db = Database()

try:
    fileHandle = open("device_mapping.json", "r")
    devices = json.load(fileHandle)
except Exception as e:
    current_app.logger.exception("Exception occured while reading device json", exc_info=True)


@blueprint.route('/get-data')
def audio_data():
    """
    API to fetch the data from database depending on parameter from queryPanel
    This data will be consumed by chart component and stats components
    """
    try:
        region_id = request.args.get("region_id", "1")

        # Fetch the device. E.g. 192.168.64.101 becomes 101
        device_id = devices[str(region_id)].split(".")[-1]
        # Defines the hostname E.g. 192.168.64.101 becomes pi101.pi.bmi.emory.edu
        device_location = "pi{}.pi.bmi.emory.edu".format(device_id)

        response = db.query_audio(location=device_location)

        ch1 = list(filter(lambda x: x['channel'] == 0, response))
        ch2 = list(filter(lambda x: x['channel'] == 1, response))
        ch3 = list(filter(lambda x: x['channel'] == 2, response))
        ch4 = list(filter(lambda x: x['channel'] == 3, response))

        x = list(map(lambda x: x['time'], ch1))
        y0 = list(map(lambda x: x['value'], ch1))
        y1 = list(map(lambda x: x['value'], ch2))
        y2 = list(map(lambda x: x['value'], ch3))
        y3 = list(map(lambda x: x['value'], ch4))

        print(len(x))
        print("-"*10)

        return {"data": {'x': x,
                         'Channel1': y0,
                         'Channel2': y1,
                         'Channel3': y2,
                         'Channel4': y3
                         }
                }
    except Exception as e:
        current_app.logger.exception("Exception occured", exc_info=True)
