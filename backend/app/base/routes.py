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
from app.base import email


@blueprint.route('/login', methods=["POST"])
def login():
    """
    Method to login to the system
    """
    try:
        # fetching the data
        req_data = request.get_json()
        current_app.logger.info(req_data)

        # parsing email and password
        _email = req_data.get("email")
        _password = req_data.get("password")

        # fetch user from SQLite
        user_exists = Users.get_by_email(_email)

        # if user is not present in DB
        if not user_exists:
            return {"success": False,
                    "msg": "This email does not exist."}, 400

        # if password doesnt match
        if not user_exists.check_password(_password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 400

        # create access token uwing JWT
        token = jwt.encode({'email': _email, 'exp': datetime.now(timezone.utc) + timedelta(minutes=30)}, current_app.config["SECRET_KEY"])

        # set the JWT auth token active for session
        user_exists.set_jwt_auth_active(True)
        user_exists.save()

        return {"success": True,
                "token": token,
                "user": user_exists.toJSON()}, 200

    except Exception as e:
        current_app.logger.error("Error Occured while login : {}".format(str(e)))
        return {"success": False,
                "msg": "Oops ! Something went wrong."}, 400


@blueprint.route('/logout', methods=["POST"])
@login_required
def logout(current_user):
    """
    Method to logout from the system
    """
    try:
        # parse the token from the request
        _jwt_token = request.headers["authorization"]

        # decode the JWT token ot get email of user
        _data = jwt.decode(_jwt_token, key=current_app.config["SECRET_KEY"], algorithms=['HS256'])
        _email = _data.get('email', '')

        # search user in the database
        current_user = Users.get_by_email(_email)

        # If user not found in database
        if not current_user:
            return {"success": False,
                    "msg": "Invalid Token or Request"}, 401

        # Disable the Session Token
        jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        jwt_block.save()

        # disable the JWT auth
        current_user.set_jwt_auth_active(False)
        current_user.save()

        return {"success": True}, 200

    except Exception as e:
        current_app.logger.error("Error Occured while doing logout : {}".format(str(e)))
        return {"success": False,
                "msg": "Oops ! Something went wrong."}, 400


@blueprint.route('/register', methods=["POST"])
def register():
    """
    Register a new user to the system
    """
    try:
        # parse the user data
        req_data = request.get_json()
        _username = req_data.get("username")
        _email = req_data.get("email")
        _password = req_data.get("password")

        # search the user in SQLite database
        user_exists = Users.get_by_email(_email)

        # if user is already registered
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400

        # create a new user in the model
        new_user = Users(username=_username, email=_email)
        new_user.set_password(_password)
        new_user.save()

        # send the email
        #send_email("TEst", "Test", "rsingh388@gatech.edu")

        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, 200

    except Exception as e:
        current_app.logger.error("Error Occured while Registering the user : {}".format(str(e)))
        return {"success": False,
                "msg": "Oops ! Something went wrong."}, 400


@blueprint.route('/forget-password', methods=["POST"])
def forget_password():
    """
    Forgetting the password
    """
    try:
        # parse the username from the request
        req_data = request.get_json()
        _email = req_data.get("username")

        # create a reset token for the user
        reset_token = Users.get_reset_token(_email)

        # create the email with the data
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
    """
    Resetting the password
    """
    try:
        # A post request sent indicates when userlink is correct
        if request.method == "POST":
            return {"success": True, "msg": "Done"}

        # Request of get indicates that the user wants to reset the password
        elif request.method == "GET":
            # parse the token
            token = request.args.get("token")

            # search the user in SQLite DB
            user = Users.check_reset_token(token)

            # if user doesnt exist implies that token isnt active any more.
            if user is None:
                return {"success": False,
                        "msg": "Password Reset Link has expired or is invalid."}, 400

            return {"success": True,
                    "msg": "Password is resetted"}, 200
    except Exception as e:
        current_app.logger.error("Error Occured while resetting the passowrd : {}".format(str(e)))
        return {"success": False,
                "msg": "Error occured while processing the request"}, 400


@blueprint.route('/validate-token', methods=["POST"])
def validate_token():
    """
    Validating the JWT Token
    """
    try:
        # parse the token and decode the email of users
        req_data = request.get_json()
        token = req_data.get('token', '')
        _data = jwt.decode(token, key=current_app.config["SECRET_KEY"], algorithms=['HS256'])
        _email = _data.get('email', '')

        # search the user in SQLite database
        user_exists = Users.get_by_email(_email)

        # If Request is not made from valid user
        if user_exists is None:
            return {"success": False,
                    "msg": "Invalid User token."}

        # Check if token has expired
        # Check if user hasnt logged out
        _exp = _data.get('exp')
        if user_exists.check_jwt_auth_active() and (datetime.now(timezone.utc) <= datetime.fromtimestamp(_exp, tz=timezone.utc)):
            return {"success": True,
                    "username": user_exists.username,
                    "email": user_exists.email,
                    "msg": "Session is active"}, 200

        return {"success": False,
                "username": "",
                "email": "",
                "msg": "Session has expired."}, 401

    except Exception as e:
        current_app.logger.error("Exception occured while validating the token : {}".format(str(e)))
        return {"success": False,
                "username": "",
                "email": "",
                "msg": "Error Occured while processing the token. : {}".format(str(e))}, 401
