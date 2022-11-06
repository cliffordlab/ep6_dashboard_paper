"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2022-10-18 21:20:49
  Last Modified : 2022-09-18 21:20:49
  Description : This is a blueprint configuration file for the Bluetooth Service.
"""

from flask import Blueprint

blueprint = Blueprint(
    'bluetooth_blueprint',
    __name__,
    url_prefix='/bluetooth',
    template_folder='templates',
    static_folder='static'
)
