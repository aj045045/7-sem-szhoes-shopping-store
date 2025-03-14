from app.controller.ImageController import ImageController_bp
from app.controller.GraphController import GraphController_bp
from app.controller.CountController import CountController_bp
from app.controller.AggregationController import AggregationController_bp 

from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask application with custom static and template folder paths
app = Flask(__name__, template_folder='../templates', static_url_path='/static', static_folder='../static')
CORS(app)

@app.before_request
def Before_Request():
    """
    Before Request Middleware

    This function runs before every request is processed. It checks that the incoming request
    has the correct content type for PUT, DELETE, and POST methods. If the content type is not 
    'application/json', it raises an exception.

    Raises:
        Exception: If the request Content-Type header is not 'application/json' for methods 
                that require it (PUT, DELETE, POST).
    """
    if request.method in ['PUT', 'DELETE', 'POST']:
        if request.headers['Content-Type'] != 'application/json':
            raise Exception("Content Type must be application/json")

@app.after_request
def convert_to_json(response):
    """
    After Request Middleware: Response Handler

    This function runs after every request has been processed. It checks if the response is 
    a dictionary and converts it into a JSON response using Flask's `jsonify` function.
    
    Args:
        response (Response): The response object generated by the application.
        
    Returns:
        Response: The response object, potentially modified to be in JSON format if the original 
                response was a dictionary.
    """
    # Ensure response is in JSON format if it's a dictionary
    if isinstance(response.get_json(), dict):
        response.set_data(jsonify(response.get_json()).data)
    return response

@app.errorhandler(Exception)
def Error_Handling(error):
    """
    Global Error Handler

    This function handles all exceptions raised within the Flask application. It captures 
    the error message and wraps it in a JSON object for consistent error handling.
    
    Args:
        error (Exception): The exception object raised during request processing.
        
    Returns:
        Response: A JSON response containing the error message and status.
    """
    data = {
        "status": "alert",
        "message": str(error)
    }
    return jsonify(data)

# Register the blueprints for different controllers to handle routing for images and graphs
app.register_blueprint(ImageController_bp)
app.register_blueprint(GraphController_bp)
app.register_blueprint(CountController_bp)
app.register_blueprint(AggregationController_bp)
