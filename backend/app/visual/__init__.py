"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:49
  Last Modified : 2021-09-18 21:20:49
  Description : This is a blueprint configuration file for the Visual Service.
"""

from flask import Blueprint

blueprint = Blueprint(
    'visual_blueprint',
    __name__,
    url_prefix='/visual',
    template_folder='templates',
    static_folder='static'
)
