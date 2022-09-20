"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:40
  Last Modified : 2021-09-18 21:20:40
  Description : This is the file defining the routes for audio services. 
"""

from flask import jsonify, render_template, redirect, request, url_for, current_app
import json

from app.humidity import blueprint
from app.utils.Database import Database


db = Database()

# static fileHandle to know which Pi maps to which number
try:
    fileHandle = open("device_mapping.json", "r")
    devices = json.load(fileHandle)
except Exception as e:
    current_app.logger.exception("Exception occured while reading device json", exc_info=True)


@blueprint.route('/get-data')
def humidity_temperature_data():
    """
    API to fetch the data from database depending on parameter from queryPanel
    This data will be consumed by chart component and stats components
    """
    try:
        # get the region of interest from the reuest
        region_id = request.args.get("region_id", "1")

        # Fetch the device. E.g. 192.168.64.101 becomes 101
        device_id = devices[str(region_id)].split(".")[-1]

        # Defines the hostname E.g. 192.168.64.101 becomes pi101.pi.bmi.emory.edu
        device_location = "pi{}.pi.bmi.emory.edu".format(device_id)

        # query the influx database to get the humidity data
        response = db.query_humidity(location=device_location)

        # parsing the response from influx DB to get temperature and humidity
        temp = list(filter(lambda x: x['measurement'] == "temperature", response))
        humid = list(filter(lambda x: x['measurement'] == "humidity", response))

        # parse the response to get a list
        x = list(map(lambda x: x['time'], temp))
        temperature = list(map(lambda x: x['value'], temp))
        humidity = list(map(lambda x: x['value'], humid))

        return {"data": {'x': x,
                         'temperature': temperature,
                         'humidity': humidity
                         }
                }
    except Exception as e:
        current_app.logger.error("Exception ocurred", exc_info=True)
