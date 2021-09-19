from flask import Blueprint

blueprint = Blueprint(
    'audio_blueprint',
    __name__,
    url_prefix='/audio',
    template_folder='templates',
    static_folder='static'
)
