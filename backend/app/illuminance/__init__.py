"""
  Author : Arjunsinh Nakum
  Email : [arjun.nakum2@gmail.com]
  Date Created : 2021-09-18 21:20:49
  Last Modified : 2021-09-18 21:20:49
  Description : This is a blueprint configuration file for the Illuminance Service.
"""

from flask import Blueprint

blueprint = Blueprint(
    'illuminance_blueprint',
    __name__,
    url_prefix='/illuminance',
    template_folder='templates',
    static_folder='static'
)
