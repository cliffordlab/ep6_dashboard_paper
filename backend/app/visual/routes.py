"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:40
  Last Modified : 2021-09-18 21:20:40
  Description : This is the file defining the routes for audio services.
"""

from flask import jsonify, render_template, redirect, request, url_for, send_file
import numpy as np
import os

from app import db
from app.visual import blueprint


@blueprint.route('/')
def route_default():
    return "Hello Lord Visual !"


"""
API to fetch the data from database depending on parameter from queryPanel
This data will be consumed by chart component and stats components
"""


@blueprint.route('/get-data')
def visual_data():
    print("Roger that")
    path = os.path.join("visual","static","images","map.JPG")
    return send_file(path, mimetype='image/jpg')


@blueprint.route('/get-status')
def get_status():
    rows = {"data": [{"name": "Kitchen PI - 04", "location": "Kitchen", "ipAddress": "192.168.0.13", "status": "connected"},
                     {"name": "Kitchen PI - 01", 'location': 'Kitchen', 'ipAddress': '192.168.0.7', 'status': 'disconnected'},
                     {"name": "Kitchen PI - 02", 'location': 'Kitchen', 'ipAddress': '192.168.0.19', 'status': 'disconnected'},
                     {"name": "Kitchen PI - 03", 'location': 'Kitchen', 'ipAddress': '192.168.0.29', 'status': 'booting'}]}
    return rows
