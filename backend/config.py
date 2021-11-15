"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:21:09
  Last Modified : 2021-09-18 21:21:09
  Description : This is a configuration file holding different configurations for different environments.
"""

import os
from smtplib import SMTP_PORT
from decouple import config


class Config(object):

    basedir = os.path.abspath(os.path.dirname(__file__))

    # Setting a secret key to encryption
    SECRET_KEY = config('SECRET_KEY', default='Ja!Shr!Ram')

    # This will create a file in <app> FOLDER
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'db.sqlite3')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Defining Server for the Mail Service
    SMTP_SERVER = config('SMTP_SERVER', default="smtp-mail.outlook.com")
    SMTP_PORT = int(config('SMTP_PORT', 465))
    EMAIL_SENDER = config('EMAIL_SENDER', '')
    EMAIL_PASSWORD = config('EMAIL_PASSWORD', '')

    # Defining the log directory
    LOG_CONFIG = os.path.join(basedir, "logging.conf")
    LOG_DIRECTORY = os.path.join(basedir, "logs")


# Production environment specific configurations go here
class ProductionConfig(Config):
    DEBUG = False
    ENV = "PROD"

    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_DURATION = 3600


# UAT Specific configurations go here
class UATConfig(Config):
    DEBUG = True
    ENV = "UAT"


# DEV Specific configurations go here
class DevConfig(Config):
    DEBUG = True
    ENV = "DEV"


# Load all possible configurations
config_dict = {
    'PROD': ProductionConfig,
    'UAT': UATConfig,
    'DEV': DevConfig
}
