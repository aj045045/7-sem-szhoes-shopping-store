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

admin_bp = Blueprint('admin',__name__,url_prefix='/admin')

# REVIEW - Import from customer controller
from .admin import getAdminDetail

admin_bp.add_url_rule("/detail","admin_detail",getAdminDetail,methods=['GET'])
