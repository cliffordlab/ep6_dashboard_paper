from flask import jsonify, render_template, redirect, request, url_for

from app import db
from app.base import blueprint


@blueprint.route('/')
def route_default():
    return "Hello Peter !"
