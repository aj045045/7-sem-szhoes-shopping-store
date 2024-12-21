from app.config import app
import os
from dotenv import load_dotenv
from flask import render_template

# Remove specific environment variables from the OS environment
variables_to_remove = ['FLASK_ENV', 'SECRET_KEY']
for var in variables_to_remove:
    os.environ.pop(var, None)

# Load environment variables from a .env file into the OS environment
load_dotenv()

@app.route('/',methods=['GET'])
def greeting():
    """
    Renders the home page.

    This function is responsible for rendering the 'home.html' template
    and passing the value of the 'FLASK_ENV' environment variable as a 
    context variable (flask_page) to the template.
    
    Returns:
        Template: Renders 'home.html' with the Flask environment variable.
    """
    return render_template('home.html', flask_page=os.getenv('FLASK_ENV'))

# Configure the Flask application settings
app.config['ENV'] = os.getenv('FLASK_ENV')
app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')

if __name__ == "__main__":
    """
    Start the Flask application in debug mode.

    This block ensures that the app will only run when executed directly, 
    and not when imported as a module. Running in debug mode helps with 
    development by providing detailed error messages and live reloading.
    """
    app.run(debug=True,port=5001)
