from flask import Flask
from flask_cors import CORS
from config import Flask_secret_key #,JWT_secret_key
from flask_session import Session
#import os

global app
app = Flask(__name__)
app.secret_key = Flask_secret_key #os.environ.get("SECRET_KEY") or os.urandom(24)
#app.config['JWT_SECRET_KEY'] = JWT_secret_key
#app.config['JWT_TOKEN_LOCATION'] = ['cookies']
#app.config['JWT_COOKIE_SECURE'] = False # in production, set to True
#app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['SESSION_TYPE'] = 'filesystem'
CORS(app)
Session(app)