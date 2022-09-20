"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-09-18 21:19:58
  Last Modified : 2021-09-18 21:19:58
  Description : This is APIs for sending emails
"""
from flask import current_app
from app import mail


def send_email(subject, body, send_to):
    """
    API to send email from system
    """
    try:
        msg = mail.EmailMessage(
            subject,
            body,
            current_app.config["EMAIL_SENDER"],
            [send_to]
        )
        msg.content_subtype = "html"
        msg.send()
        return True
    except:
        current_app.logger.info('ERR - Cannot send email, please check MAIL settings')
        current_app.logger.info('    -> MAIL Subject: ' + subject)
        current_app.logger.info('    -> MAIL Body: ' + body)
        return False
