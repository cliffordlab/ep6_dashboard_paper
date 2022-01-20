"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:40
  Last Modified : 2021-09-18 21:20:40
  Description : This is the file defining the routes for audio services. 
"""

from flask import jsonify, render_template, redirect, request, url_for, current_app

from app.humidity import blueprint
from app.utils.Database import Database


db = Database()


@blueprint.route('/get-data')
def humidity_temperature_data():
    """
    API to fetch the data from database depending on parameter from queryPanel
    This data will be consumed by chart component and stats components
    """
    try:
        region_id = request.args.get("region_id")
        device_location = "pi160.pi.bmi.emory.edu"

        response = db.query_humidity(location=device_location)

        temp = list(filter(lambda x: x['measurement'] == "temperature", response))
        humid = list(filter(lambda x: x['measurement'] == "humidity", response))

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
