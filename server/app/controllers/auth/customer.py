from flask import request
from . import createResponse
from app.services.auth.customer import CustomerService

def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    phoneNo = data['phoneNo']
    password = data['password']
    generatedOtp = data['generatedOtp']
    otp = data['otp']
    CustomerService.registerCustomer(name,email,phoneNo,password,generatedOtp,otp)    
    return createResponse('Thank for registration')