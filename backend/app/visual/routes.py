"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:40
  Last Modified : 2021-09-18 21:20:40
  Description : This is the file defining the routes for audio services.
"""

from cache import cache
from flask import jsonify, render_template, redirect, request, url_for, send_file, current_app
import json
import os
import subprocess

from app.visual import blueprint


@blueprint.route('/get-data')
def visual_data():
    """
    API to fetch the data from database depending on parameter from queryPanel
    This data will be consumed by chart component and stats components
    """
    try:
        path = os.path.join("visual", "static", "images", "map.JPG")
        return send_file(path, mimetype='image/jpg')
    except Exception as e:
        current_app.logger.error("Exception Occured", exc_info=True)


@blueprint.route('/get-layout')
def get_layout():
    try:
        file_path = os.path.join(current_app.config['POSNET_DIR'], "ep6_map_positions.jpg")
        return send_file(file_path, mimetype="image/jpg")
    except Exception as e:
        current_app.logger.exception("Exception occured", exc_info=True)
        return


@blueprint.route('/get-points')
def get_points():
    try:
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
    except Exception as e:
        point_map = {'areas': []}
        current_app.logger.exception("Exception occured in sending the co-ordinates", exc_info=True)
        return point_map


@ blueprint.route('/get-status')
@cache.cached(timeout=300)
def get_status():
    rows = {"data": [{"name": "Kitchen PI - 04", "location": "Kitchen", "ipAddress": "192.168.0.13", "status": "connected"},
                     {"name": "Kitchen PI - 01", 'location': 'Kitchen', 'ipAddress': '192.168.0.7', 'status': 'disconnected'},
                     {"name": "Kitchen PI - 02", 'location': 'Kitchen', 'ipAddress': '192.168.0.19', 'status': 'disconnected'},
                     {"name": "Kitchen PI - 03", 'location': 'Kitchen', 'ipAddress': '192.168.0.29', 'status': 'booting'}]}

    try:
        fileHandle = open("device_mapping.json", "r")
        devices = json.load(fileHandle)

        status = []
        for device_id, ip in devices.items():
            output = subprocess.check_output(["ping", ip, "-c", str(1)])
            # If all packets are reached then PI is ok
            device_status = "disconnected"
            if("1 received" in str(output)):
                device_status = "connected"
            status.append({"name": "Device - {}".format(device_id), "location": "-", "ipAddress": ip, "status": device_status})

        rows = {"data": status, }
        return rows
    except Exception as e:
        current_app.logger.exception("Exception occued in sending the data rows", exc_info=True)
        rows = {"data": rows["data"]}
        return rows
