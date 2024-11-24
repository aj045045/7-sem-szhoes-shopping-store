"""
Method use to create a response

This Method is used to create a response that
help to manage response
"""    
def createResponse(data):
    """
    This method is used to create a response with `status` and `data`
    """
    return {
        "status":"success",
        "data":data
    }
    
from flask import Blueprint
from flask_restful import Api

# REVIEW - Import from customer controller
from .customer import CustomerController

customer_bp = Blueprint('customer',__name__,url_prefix='/customer')

api = Api(customer_bp)

api.add_resource(CustomerController,'/')
