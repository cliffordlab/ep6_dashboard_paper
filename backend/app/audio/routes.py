from flask import jsonify, render_template, redirect, request, url_for

from app import db
from app.audio import blueprint


@blueprint.route('/')
def route_default():
    return "Hello Steve !"
