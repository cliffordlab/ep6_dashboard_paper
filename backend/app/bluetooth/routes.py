"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2022-10-18 21:20:40
  Last Modified : 2022-10-18 21:20:40
  Description : This is the file defining the routes for audio services. 
"""

from email.mime import image
from flask import jsonify, render_template, redirect, request, url_for, current_app, send_file
import json
import os

from app.bluetooth import blueprint
from app.utils.Database import Database
from app.utils.RedisDB import RedisDB

db = Database()
redis = RedisDB()

# static fileHandle to know which Pi maps to which number
try:
    fileHandle = open("device_mapping.json", "r")
    devices = json.load(fileHandle)
except Exception as e:
    current_app.logger.exception("Exception occured while reading device json", exc_info=True)


@blueprint.route('/get-data')
def static_data():
    """
    API to fetch the data from database depending on parameter from queryPanel
    This data will be consumed by chart component and stats components
    """
    try:
        path = os.path.join("bluetooth", "static", "pic.jpg")
        return send_file(path, mimetype='image/jpg')
    except Exception as e:
        current_app.logger.error("Exception Occured", exc_info=True)


@blueprint.route('/get-position')
def get_bluetooth_position():
    """
    API to fetch the position of people plotted from Bluetooth beacon
    This data is sourced from Redis using key `bluetooth_position`
    """
    try:
        # get the data from redis and store it in media
        image_path = os.path.join("bluetooth", "static", "images", "bluetooth_position.jpg")
        redis.get_image("bluetooth_position", image_path)
    except Exception as e:
        image_path = os.path.join("visual", "static", "images", "ep6_map_positions.jpg")
        current_app.logger.exception("Exception occurred in fetching the data : {}".format(str(e)))
    finally:
        return send_file(image_path, mimetype='image/jpg')
