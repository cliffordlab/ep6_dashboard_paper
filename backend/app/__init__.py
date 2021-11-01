<<<<<<< HEAD
"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:31
  Last Modified : 2021-09-18 21:20:31
  Description : This file configures database, registers the blueprint and extensions
"""

from os import path
from logging import basicConfig, DEBUG, getLogger, StreamHandler
from importlib import import_module
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, url_for

db = SQLAlchemy()


def register_extensions(app):
    db.init_app(app)


def register_blueprints(app):
    for module_name in ('base', 'audio', 'visual', 'humidity', 'illuminance', 'mail'):
        module = import_module('app.{}.routes'.format(module_name))
        app.register_blueprint(module.blueprint)


def configure_database(app):

    @app.before_first_request
    def initialize_database():
        db.create_all()

    @app.teardown_request
    def shutdown_session(exception=None):
        db.session.remove()


def create_app(config):
    app = Flask(__name__, static_folder='base/static')
    app.config.from_object(config)
    register_extensions(app)
    register_blueprints(app)
    configure_database(app)
    return app
=======
"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:31
  Last Modified : 2021-09-18 21:20:31
  Description : This file configures database, registers the blueprint and extensions
"""

from os import path
from logging import basicConfig, DEBUG, getLogger, StreamHandler
from importlib import import_module
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, url_for

db = SQLAlchemy()


def register_extensions(app):
    db.init_app(app)


def register_blueprints(app):
    for module_name in ('base', 'audio', 'visual', 'humidity', 'illuminance', 'mail'):
        module = import_module('app.{}.routes'.format(module_name))
        app.register_blueprint(module.blueprint)


def configure_database(app):

    @app.before_first_request
    def initialize_database():
        db.create_all()

    @app.teardown_request
    def shutdown_session(exception=None):
        db.session.remove()


def create_app(config):
    app = Flask(__name__, static_folder='base/static')
    app.config.from_object(config)
    register_extensions(app)
    register_blueprints(app)
    configure_database(app)
    return app
<<<<<<< HEAD
>>>>>>> bffa53b... DAS-20 : Integrating the DB with Flask
=======
>>>>>>> 86ee27a... DAS - 20 : Adding Configuration for Email Service
