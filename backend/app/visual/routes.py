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


@blueprint.route('/get-layout')
def get_layout():
    return send_file("visual//static//images//layout.jpg", mimetype="image/jpg")


@blueprint.route('/get-points')
def get_points():
    point_map = {'areas': [{
        "name": "1",
        "shape": "poly",
        "coords": [25, 33, 27, 300, 128, 240, 128, 94],
        "preFillColor": "transparent",
        "fillColor": "#0000ff"
    },
        {
        "name": "2",
        "shape": "poly",
        "coords": [219, 118, 220, 210, 283, 210, 284, 119],
        "preFillColor": "transparent",
        "lineWidth": 5,
        "strokeColor": "#transparent"
    },
        {
        "name": "3",
        "shape": "poly",
        "coords": [381, 241, 383, 94, 462, 53, 457, 282],
        "preFillColor": "transparent",
        "lineWidth": 5,
        "strokeColor": "#transparent"
    },
        {
        "name": "4",
        "shape": "poly",
        "coords": [245, 285, 290, 285, 274, 239, 249, 238],
        "preFillColor": "transparent"
    },
        {
        "name": "5",
        "shape": "circle",
        "coords": [170, 100, 10],
        "preFillColor": "rgb(255,255,255,0.3)",
        "lineWidth": 2
    },
        {
        "name": "5.5",
        "shape": "poly",
        "coords": [170, 100, 170, 180, 246, 156],
        "preFillColor": "transparent",
        "fillColor": "#0000ff",
        "strokeColor": "transparent"
    },

        {
        "name": "6",
        "shape": "rect",
        "coords": [270, 100, 200, 50],
        "lineWidth": 2,
        "preFillColor": "rgba(255, 255, 255, 0.3)",
        "strokeColor": "transparent"
    }
    ]}
    return point_map


@ blueprint.route('/get-status')
def get_status():
    rows = {"data": [{"name": "Kitchen PI - 04", "location": "Kitchen", "ipAddress": "192.168.0.13", "status": "connected"},
                     {"name": "Kitchen PI - 01", 'location': 'Kitchen', 'ipAddress': '192.168.0.7', 'status': 'disconnected'},
                     {"name": "Kitchen PI - 02", 'location': 'Kitchen', 'ipAddress': '192.168.0.19', 'status': 'disconnected'},
                     {"name": "Kitchen PI - 03", 'location': 'Kitchen', 'ipAddress': '192.168.0.29', 'status': 'booting'}]}
    return rows
