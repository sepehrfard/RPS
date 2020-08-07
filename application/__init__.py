from flask import Flask
from config import Config
from flask_restx import Api

api = Api()

app = Flask(__name__)
app.config["SECRET_KEY"] = Config.SECRET_KEY
api.init_app(app)

from application import routes
