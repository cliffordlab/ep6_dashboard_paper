"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-11-01 02:04:52
  Last Modified : 2021-11-01 02:04:52
  Description : Blueprint for the mail service
"""

from flask import Blueprint

blueprint = Blueprint(
    'mail_blueprint',
    __name__,
    url_prefix='/mail',
    template_folder='templates',
    static_folder='static'
)
