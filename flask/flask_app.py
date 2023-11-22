from flask import Flask
from flask_cors import CORS
from config import JWT_secret_key
import os

global app
app = Flask(__name__)
cors = CORS(app)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)
app.config['JWT_SECRET_KEY'] = JWT_secret_key
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = False # in production, set to True
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
