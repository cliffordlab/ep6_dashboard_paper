"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:21:28
  Last Modified : 2021-09-18 21:21:28
  Description : This file wraps all of the configuration, database extension and executes Flask server
"""

from flask_migrate import Migrate
from os import environ
from sys import exit
from decouple import config
import logging

from config import config_dict
from app import create_app, db

# Fetching the environment from local configuration file .env
ENV = config('ENV', default="UAT")
PORT = config("PORT", default=9800)

try:
    app_config = config_dict[ENV.upper()]
except KeyError:
    exit('Error: Invalid configuration key "{}". Expected values [DEV, UAT, PROD]'.format(ENV.upper()))
try:
    DEBUG = app_config.DEBUG
except:
    DEBUG = False


app = create_app(app_config)
Migrate(app, db)


if DEBUG:
    app.logger.info('DEBUG       = ' + str(DEBUG))
    app.logger.info('Environment = ' + ENV)
    app.logger.info('DBMS        = ' + app_config.SQLALCHEMY_DATABASE_URI)

if __name__ == "__main__":
    app.run(port=PORT)
