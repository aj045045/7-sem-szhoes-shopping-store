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

# REVIEW - Import from customer controller
from .customer import getCustomerDetail,updateCustomerProfile,updatePassword
from .address import addAddress,updateAddress,deleteAddress

customer_bp = Blueprint('customer',__name__,url_prefix='/customer')

customer_bp.add_url_rule('/detail/<customerId>','customer_detail',getCustomerDetail,methods=['GET'])
customer_bp.add_url_rule('/add-address/<customerId>','customer_add_address',addAddress,methods=['POST'])
customer_bp.add_url_rule('/profile/<customerId>','customer_update_profile',updateCustomerProfile,methods=['PUT'])
customer_bp.add_url_rule('/address/<addressId>','customer_update_address',updateAddress,methods=['PUT'])
customer_bp.add_url_rule('/address/<addressId>/<customerId>','customer_delete_address',deleteAddress,methods=['DELETE'])
customer_bp.add_url_rule('/password/<customerId>','customer_update_password',updatePassword,methods=['PUT'])