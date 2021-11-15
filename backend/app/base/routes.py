<<<<<<< HEAD
"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:22
  Last Modified : 2021-09-18 21:20:22
  Description : This blueprint contains the routes for the shared functionalities among the services like login 
"""

from flask import jsonify, render_template, redirect, request, url_for

from app import db
from app.base import blueprint


@blueprint.route('/')
def route_default():
    return "Hello Peter !"
=======
"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:22
  Last Modified : 2021-09-18 21:20:22
  Description : This blueprint contains the routes for the shared functionalities among the services like login 
"""

from flask import jsonify, render_template, redirect, request, url_for

from app import db
from app.base import blueprint
<<<<<<< HEAD
>>>>>>> 0fe7c71... DAS - 15 : Adding Logs to the files
=======
>>>>>>> 971943b... DAS - 15 : Adding Logs to the files
