"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:19:58
  Last Modified : 2021-09-18 21:19:58
  Description : This is Model Schema file for the SQLite Database
"""
from datetime import datetime, timedelta, timezone
import json
from flask import current_app
import jwt
from pytz import timezone
from werkzeug.security import generate_password_hash, check_password_hash

from app import db


class Users(db.Model):
    """
    Schema for Users Table
    Columns:
        id              : int
        username        : varchar(32)
        email           : varchar(64)
        password        : text
        jwt_auth_active : boolean
        date_joined     : datetime 
    """
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.Text())
    jwt_auth_active = db.Column(db.Boolean())
    date_joined = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"User {self.username}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_email(self, new_email):
        self.email = new_email

    def update_username(self, new_username):
        self.username = new_username

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_reset_token(cls, email, expires=500):
        return jwt.encode({'reset_password': email,
                           'exp':  datetime.now(timezone.utc) + timedelta(seconds=expires)},
                          key=current_app.config["SECRET_KEY"], algorithm='HS256')

    @classmethod
    def check_reset_token(cls, token):
        email = jwt.decode(token, key=current_app.config["SECRET_KEY"], algorithms=['HS256'])['reset_password']
        return cls.query.filter_by(email=email).first()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['username'] = self.username
        cls_dict['email'] = self.email

        return cls_dict

    def toJSON(self):

        return self.toDICT()


class JWTTokenBlocklist(db.Model):
    """
    Schema for JWTTokenBlock Table
    Columns:
        id              : int
        jwt_token       : text
        created_at      : datetime 
    """

    id = db.Column(db.Integer(), primary_key=True)
    jwt_token = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f"Expired Token: {self.jwt_token}"

    def save(self):
        db.session.add(self)
        db.session.commit()
