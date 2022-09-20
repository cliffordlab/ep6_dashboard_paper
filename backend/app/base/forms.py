"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:19:58
  Last Modified : 2021-09-18 21:19:58
  Description : Forms for various processes like Login, Reset Password, 
                Forget Password and Creating Account
"""
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, HiddenField
from wtforms.validators import Email, DataRequired, EqualTo


class LoginForm(FlaskForm):
    """
    Form to define schema with Username and Password for Login
    """
    username = StringField('Username',
                           id='username_login',
                           validators=[DataRequired()])
    password = PasswordField('Password',
                             id='pwd_login',
                             validators=[DataRequired()])


class CreateAccountForm(FlaskForm):
    """
    Form to define schema with Username, Email and Password for 
    Creating Account
    """
    username = StringField('Username',
                           id='username_create',
                           validators=[DataRequired()])
    email = StringField('Email',
                        id='email_create',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password',
                             id='pwd_create',
                             validators=[DataRequired()])


class ForgotPasswordForm(FlaskForm):
    """
    Form to define schema of Username and Password for Password Forget
    """
    email = StringField('Email',
                        id='email_create',
                        validators=[DataRequired(), Email()])


class ResetPasswordForm(FlaskForm):
    """
    Form to define schema of Username and Password for Password reset
    """
    # set password and email token as hidden key
    email_token_key = HiddenField()
    email = HiddenField()
    password = PasswordField('New Password',
                             id='pwd_create',
                             validators=[DataRequired()])
    confirm_password = PasswordField(u'Confirm Password again',
                                     [EqualTo('password',
                                              message="Passwords don't match")])
