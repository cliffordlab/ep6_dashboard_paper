"""
  Author : ArjunSinh Nakum
  Email : [arjun.nakum2@gmail.com]
  Date Created : 2021-09-18 21:20:40
  Last Modified : 2021-09-18 21:20:40
  Description : This is the file defining the routes for illuminance services. 
"""

from flask import jsonify, render_template, redirect, request, url_for, current_app
import json

from app.illuminance import blueprint
from app.utils.Database import Database


db = Database()
try:
    fileHandle = open("device_mapping.json", "r")
    devices = json.load(fileHandle)
except Exception as e:
    current_app.logger.exception("Exception occured while reading device json", exc_info=True)


@blueprint.route('/get-data')
def illuminance_data():
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

        response = db.query_illuminance(location=device_location)

        R_channel = list(filter(lambda x: x['channel'] == 0, response))
        G_channel = list(filter(lambda x: x['channel'] == 1, response))
        B_channel = list(filter(lambda x: x['channel'] == 2, response))
        CT_channel = list(filter(lambda x: x['channel'] == 3, response))
        Lux_channel = list(filter(lambda x: x['channel'] == 4, response))
        Luxnc_channel = list(filter(lambda x: x['channel'] == 5, response))

        x = list(map(lambda x: x['time'], R_channel))
        y0 = list(map(lambda x: x['value'], R_channel))
        y1 = list(map(lambda x: x['value'], G_channel))
        y2 = list(map(lambda x: x['value'], B_channel))
        y3 = list(map(lambda x: x['value'], CT_channel))
        y4 = list(map(lambda x: x['value'], Lux_channel))
        y5 = list(map(lambda x: x['value'], Luxnc_channel))

        return {"data": {'x': x,
                         'Channel1': y0,
                         'Channel2': y1,
                         'Channel3': y2,
                         'Channel4': y3,
                         'Channel5': y4,
                         'Channel6': y5
                         }
                }

    except Exception as e:
        current_app.logger.error("Exception occured", exc_info=True)
        return str(e)
