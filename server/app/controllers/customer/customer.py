from flask import request
from . import ResponseUtil
from app.services.customer.customer import CustomerService

def getCustomerDetail(customerId):
    return ResponseUtil.createResponse(CustomerService.getCustomerDetail(customerId))