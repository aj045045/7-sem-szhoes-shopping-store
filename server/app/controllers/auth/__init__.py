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

auth_bp = Blueprint('auth',__name__,url_prefix='/auth')
# REVIEW - Import for auth registration
from .customer import register

auth_bp.add_url_rule('/customer/register','customer_register',register,methods=['POST'])