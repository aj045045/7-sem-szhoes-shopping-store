from flask import render_template
from dotenv import load_dotenv
import os
from mongoengine import connect
from app.config import app
from flask_cors import CORS

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

CORS(app, resources={r"/*": {"origins": os.getenv('LOCAL_CLIENT_URL',"*")}})

# Connect to MongoDB
mongodb_uri = "mongodb+srv://aj045045:aj045045ClusterProject@clusterproject.sxbcy.mongodb.net/SZhoes?retryWrites=true&w=majority&appName=ClusterProject"
connect(host=mongodb_uri)

if __name__ == "__main__":
    """
    Start Flask app in debug mode.
    """
    app.run(debug=os.getenv('LOCAL_DEBUG', False)) 
