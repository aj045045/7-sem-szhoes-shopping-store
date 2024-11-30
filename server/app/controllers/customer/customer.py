from flask import request
from . import ResponseUtil
from app.services.customer import CustomerService

def getCustomerDetail(customerId):
    return ResponseUtil.createResponse(CustomerService.getCustomerDetail(customerId))

def updateCustomerProfile(customerId):
    data = request.get_json()
    name = data['name']
    phoneNo = data['phoneNo']
    CustomerService.updateProfile(customerId,name,phoneNo)
    return ResponseUtil.createResponseMessage("Profile updated. Please log in again to view the changes.")

def updatePassword(customerId):
    data = request.get_json()
    password = data['password']
    newPassword = data['newPassword']
    confirmPassword = data['confirmPassword']
    return ResponseUtil.createResponseMessage("Password updated successfully")

