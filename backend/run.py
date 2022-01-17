"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:21:28
  Last Modified : 2021-09-18 21:21:28
  Description : This file wraps all of the configuration, database extension and executes Flask server
"""
from cache import cache
from flask_migrate import Migrate
from flask_cors import CORS
from os import environ
from sys import exit
from decouple import config
import logging
import logging.config

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


logging.config.fileConfig(app_config.LOG_CONFIG)

app = create_app(app_config)
CORS(app)
Migrate(app, db)
cache.init_app(app, config={'CACHE_TYPE': app_config.CACHE_TYPE, 'CACHE_DEFAULT_TIMEOUT': app_config.CACHE_DEFAULT_TIMEOUT})

if DEBUG:
    app.logger.info('DEBUG       = ' + str(DEBUG))
    app.logger.info('Environment = ' + ENV)
    app.logger.info('DBMS        = ' + app_config.SQLALCHEMY_DATABASE_URI)

if __name__ == "__main__":
    app.run(port=PORT)
