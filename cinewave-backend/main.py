import os

from flask_api import FlaskAPI  # For Flask API
from flaskext.mysql import MySQL  # For MySQL database
from flask_cors import CORS  # For Cross Origin Resource Sharing

# Initialise Flask API app
app = FlaskAPI(__name__)
CORS(app)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'cinewave'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

# Other configurations
app.config["AUTH_SECRET"] = 'h3*NKZAPr.Up*@LtgX9Qza!uU2KCN2iV'
app.config["DEBUG"] = True

# Initialise MySQL with Flask app
mysql = MySQL()
mysql.init_app(app)
