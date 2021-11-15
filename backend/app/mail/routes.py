"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-11-01 01:53:17
  Last Modified : 2021-11-01 01:53:17
  Description : Mail Service to send emails
"""

from flask import current_app, request
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


from app import db
from app.mail import blueprint


@blueprint.route('/send-mail', methods=["post"])
def send_mail():
    subject = request.form.get("subject", "").strip()
    msg = request.form.get("msg", "").strip()
    receiver_email = request.form.get("recipients", "")
    text_type = request.form.get("text_type", "html")

    try:
        if(msg == "" or subject == "" or len(receiver_email) == 0):
            return "Invalid message request"

        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = current_app.config["EMAIL_SENDER"]
        message["To"] = receiver_email

        msg = MIMEText(msg, "plain") if text_type == "plain" else MIMEText(msg, "html")

        message.attach(msg)

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(current_app.config["SMTP_SERVER"], current_app.config["SMTP_PORT"], context=context) as server:
            server.login(current_app.config["EMAIL_SENDER"], current_app.config["EMAIL_PASSWORD"])
            server.sendmail(current_app.config["EMAIL_SENDER"], receiver_email, message.as_string())
        return "Mail Sent Successfully"

    except Exception as e:
        print(str(e))
        return "Sending mail failed : {}".format(str(e))
