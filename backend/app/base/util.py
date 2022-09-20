import binascii
from flask import request, current_app
from functools import wraps
import hashlib
import jwt
import os


from app.base.models import Users, JWTTokenBlocklist
from app import db


def hash_pass(password):
    """Hash a password for storing."""

    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                  salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash)  # return bytes


def verify_pass(provided_password, stored_password):
    """Verify a stored password against one provided by user"""

    stored_password = stored_password.decode('ascii')
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512',
                                  provided_password.encode('utf-8'),
                                  salt.encode('ascii'),
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password


def login_required(f):
    """
    Wrapper to do basic JWT checks. Following things are checked
    1. Headers should contain tag authorization which contains the latest token.
    2. User data is decoded from the token and checked if user token has been blocked
    3. If Token is not revoked then check if JWT is expired or not
    4. If all checks happen successfully, then normal login procedure is done. 
    """
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None

        # Validate the header to check if JWT Token is present
        if "authorization" in request.headers:
            token = request.headers["authorization"]
        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        # Decode the User data
        try:
            # get the data from JWT token
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])

            # search the user in SQLite and get the data
            current_user = Users.get_by_email(data["email"])

            # if user doesnt exist implies auth token is not valid
            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400
            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            # If Token is present in Block List
            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400
            # check if JWT token is still active
            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400
        except:
            return {"success": False, "msg": "Token is invalid"}, 400
        return f(current_user, *args, **kwargs)

    return decorator
