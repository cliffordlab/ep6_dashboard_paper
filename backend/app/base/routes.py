"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:20:22
  Last Modified : 2021-09-18 21:20:22
  Description : This blueprint contains the routes for the shared functionalities among the services like login 
"""
from datetime import datetime, timedelta, timezone
from flask import jsonify, render_template, redirect, request, url_for, current_app
import jwt
import socket

from app import db
from app.base import blueprint
from app.base.util import login_required
from app.base.models import Users, JWTTokenBlocklist
from app.base.email import send_email


@blueprint.route('/login', methods=["POST"])
def login():
    """
    Method to login to the system
    """
    req_data = request.get_json()
    current_app.logger.info(req_data)

    _email = req_data.get("email")
    _password = req_data.get("password")

    user_exists = Users.get_by_email(_email)

    if not user_exists:
        return {"success": False,
                "msg": "This email does not exist."}, 400

    if not user_exists.check_password(_password):
        return {"success": False,
                "msg": "Wrong credentials."}, 400

    # create access token uwing JWT
    token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, current_app.config["SECRET_KEY"])

    user_exists.set_jwt_auth_active(True)
    user_exists.save()

    return {"success": True,
            "token": token,
            "user": user_exists.toJSON()}, 200


@blueprint.route('/logout', methods=["POST"])
@login_required
def logout(current_user):
    _jwt_token = request.headers["authorization"]

    jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
    jwt_block.save()

    current_user.set_jwt_auth_active(False)
    current_user.save()

    return {"success": True}, 200


@blueprint.route('/register', methods=["POST"])
def register():
    req_data = request.get_json()

    _username = req_data.get("username")
    _email = req_data.get("email")
    _password = req_data.get("password")

    user_exists = Users.get_by_email(_email)

    if user_exists:
        return {"success": False,
                "msg": "Email already taken"}, 400

    new_user = Users(username=_username, email=_email)

    new_user.set_password(_password)
    new_user.save()

    send_email("TEst", "Test", "rsingh388@gatech.edu")

    return {"success": True,
            "userID": new_user.id,
            "msg": "The user was successfully registered"}, 200


@blueprint.route('/forget-password', methods=["POST"])
def forget_password():
    try:
        req_data = request.get_json()
        _email = req_data.get("username")

        reset_token = Users.get_reset_token(_email)
        subject = "EP6 Dashboard - Reset Your Password"
        body = "Please Click on Following Link to reset your Password."
        current_app.logger.info(current_app.config)
        reset_link = "{} : {}/reset-password?token={}".format(socket.getfqdn(), current_app.config["PORT"], reset_token)
        msg = "{} : {}".format(body, reset_link)
        send_email(subject, msg, _email)
        return {"success": True,
                "msg": msg}, 200

    except Exception as e:
        current_app.logger.error("Error Occured while resetting the passowrd : {}".format(str(e)))
        return {"success": False,
                "msg": "Oops ! Something went wrong."}, 400


@blueprint.route('/reset-password', methods=["GET", "POST"])
def reset_password():
    try:
        if request.method == "POST":
            return {"success": True, "msg": "Done"}
        elif request.method == "GET":
            token = request.args.get("token")
            user = Users.check_reset_token(token)
            if user is None:
                return {"success": False,
                        "msg": "Password Reset Link has expired or is invalid."}, 400

            return {"success": True,
                    "msg": "Password is resetted"}, 200
    except Exception as e:
        current_app.logger.error("Error Occured while resetting the passowrd : {}".format(str(e)))
        return {"success": False,
                "msg": "Password Reset Link has expired or is invalid."}, 400
