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



class Cohorts(db.Model):
    """
    Schema for Cohort Data
    columns:
        id              : int
        active          : boolean
        created_at      : datetime
        last_updated    : datetime
    """
    id = db.Column(db.Integer(), primary_key=True)
    active = db.Column(db.Boolean(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    last_updated = db.Column(db.DateTime(), onupdate=datetime.utcnow())

    def __init__(self, id) -> None:
        self.id = id
        self.active = True

    def __repr__(self):
        return f"Cohort ID {self.id}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update_active(self, status):
        self.active = status

    @classmethod
    def get_active_cohorts(cls):
        active_cohorts = cls.query.filter_by(active=True).all()
        return active_cohorts

    @classmethod
    def get_last_cohort(cls):
        cohorts = cls.query.all()
        last_cohort = max(list(lambda x: x.id, cohorts))
        return last_cohort


class Participants(db.Model):
    """
    Schema for participants
    columns: 
        id              : int
        cohort_id       : int
        name            : varchar(255)
        created_at      : datetime
        last_updated    : datetime
    """

    id = db.Column(db.Integer(), primary_key=True)
    cohort_id = db.Column(db.Integer(), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    beacon_id = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    last_updated = db.Column(db.DateTime(), onupdate=datetime.utcnow())

    def __init__(self, cohort_id, name, beacon_id) -> None:
        self.cohort_id = cohort_id
        self.name = name
        self.beacon_id = beacon_id

    def __repr__(self):
        return f"Participant {self.name} , Cohort ID {self.cohort_id}, Beacon ID {self.beacon_id}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_by_name(cls, name):
        return cls.query.filter_by(name=name).all()

    @classmethod
    def get_by_cohort_id(cls, cohort_id):
        return cls.query.filter_by(cohort_id=cohort_id).all()
