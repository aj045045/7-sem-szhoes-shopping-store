"""
Method use to create a response

This Method is used to create a response that
help to manage response
"""    
class ResponseUtil:
    
    @staticmethod
    def createResponse(data):
        """
        This method is used to create a response with `status` and `data`
        """
        return {
            "status":"success",
            "data":data
        }
        
    @staticmethod
    def createResponseMessage(data:str):
        return {
            "status":"success",
            "message":data
        }
        
from flask import Blueprint

auth_bp = Blueprint('auth',__name__,url_prefix='/auth')

# REVIEW - Import for auth registration
from .customer import register,get_email_id,login,pipeline

auth_bp.add_url_rule('/customer/register','customer_register',register,methods=['POST'])
auth_bp.add_url_rule('/get-email','get_email',get_email_id,methods=['GET'])
auth_bp.add_url_rule('/login','login',login,methods=['POST'])
auth_bp.add_url_rule('/pipeline/<customerId>','pipeline',pipeline,methods=['GET'])

# REVIEW - Bot
from .bot import faqBot

auth_bp.add_url_rule('/faq-bot','faq-bot',faqBot,methods=['GET'])