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

admin_bp = Blueprint('admin',__name__,url_prefix='/admin')

# REVIEW - Import from customer controller
from .admin import getAdminDetail
from .faq import addFaq, getFaq, searchFaq, updateFaq, deleteFaq

admin_bp.add_url_rule("/detail","admin_detail",getAdminDetail,methods=['GET'])
admin_bp.add_url_rule("/faq","admin_add_faq",addFaq,methods=['POST'])
admin_bp.add_url_rule("/faq","admin_get_faq",getFaq,methods=['GET'])
admin_bp.add_url_rule("/faq/search","admin_search_faq",searchFaq,methods=['GET'])
admin_bp.add_url_rule("/faq/<faqId>","admin_update_faq",updateFaq,methods=['PUT'])
admin_bp.add_url_rule("/faq/<faqId>","admin_delete_faq",deleteFaq,methods=['DELETE'])