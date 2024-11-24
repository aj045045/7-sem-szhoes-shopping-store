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

admin_bp = Blueprint('admin',__name__,url_prefix='/admin')
api = Api(admin_bp)

# REVIEW - Import from customer controller
from .admin import AdminController

api.add_resource(AdminController,'/')
