from flask import render_template
from dotenv import load_dotenv
import os
from mongoengine import connect
from app.config import app

# Load environment variables first
env_keys = os.environ.keys()
local_keys = [key for key in env_keys if key.startswith('LOCAL')]
for var in local_keys:
    os.environ.pop(var, None)

load_dotenv()

@app.route('/', methods=['GET'])
def greeting():
    """
    Renders the home page with the 'FLASK_ENV' environment variable.
    """
    return render_template('home.html', flask_page=os.getenv('LOCAL_FLASK_ENV'))

# Configure Flask app settings
app.config['ENV'] = os.getenv('LOCAL_FLASK_ENV')
app.config["SECRET_KEY"] = os.getenv('LOCAL_SECRET_KEY')
app.config["JWT_SECRET_KEY"] = os.getenv('LOCAL_JWT_SECRET_KEY')

# Connect to MongoDB
mongodb_uri = os.getenv('LOCAL_MONGODB_URI')
if not mongodb_uri:
    raise ValueError("MongoDB URI not found in environment variables.")
try:
    connect(host=mongodb_uri)
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

if __name__ == "__main__":
    """
    Start Flask app in debug mode.
    """
    app.run(debug=os.getenv('LOCAL_DEBUG', False)) 
