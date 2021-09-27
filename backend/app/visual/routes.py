"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:40
  Last Modified : 2021-09-18 21:20:40
  Description : This is the file defining the routes for audio services. 
"""

from flask import jsonify, render_template, redirect, request, url_for, send_file
import numpy as np

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
    return send_file("visual//static//images//map.jpg", mimetype='image/jpg')
