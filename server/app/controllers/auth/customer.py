from flask import request
from app.services.customer import CustomerService
from . import ResponseUtil
from app.models.customer import CustomerModel

def register():
    """
    Handles user registration. Expects a JSON payload with customer details.
    If successful, returns a response message confirming registration.
    """
    data = request.get_json()
    required_fields = ['name', 'email', 'phoneNo', 'password', 'generatedOtp', 'otp']
    for field in required_fields:
        if field not in data:
            raise Exception(f"Missing field: {field}")

    name = data['name']
    email = data['email']
    phoneNo = data['phoneNo']
    password = data['password']
    generatedOtp = data['generatedOtp']
    otp = data['otp']
    CustomerService.registerCustomer(name, email, phoneNo, password, generatedOtp, otp)
    return ResponseUtil.createResponseMessage('Thank you for registering')

def get_email_id():
    """
    Retrieves all customer email addresses.
    Returns a list of emails.
    """
    emails = CustomerService.getAllEmail()
    return ResponseUtil.createResponse(emails)

def login():
    """
    Handles user login or password reset.
    If OTP is provided, triggers password reset.
    If not, processes the login with email and password.
    """
    data = request.get_json()

    required_fields = ['email', 'password', 'generatedOtp', 'otp']
    if not all(field in data for field in required_fields):
        raise Exception("Missing required fields")

    email = data['email']
    password = data['password']
    generatedOtp = data['generatedOtp']
    otp = data['otp']
    newPassword = data.get('newPassword')
    confirmPassword = data.get('confirmPassword')

    if generatedOtp:
        # Handle password reset
        if not newPassword or not confirmPassword:
            raise Exception("Missing newPassword or Confirm Password")
        if newPassword != confirmPassword:
            raise Exception("Passwords do not match")
        CustomerService.forgetPassword(email, generatedOtp, otp, newPassword, confirmPassword)
        return ResponseUtil.createResponseMessage("Customer password updated, please try logging in again")
    else:
        data = CustomerService.loginCustomer(email, password)
        return ResponseUtil.createResponse(data)

from bson import ObjectId

def pipeline(customerId):
    search_id = ObjectId(customerId)  
    pipeline = [
    {
        "$match": {
            "_id": search_id 
        }
    },
    {
        "$limit": 1
    },
    {
        "$lookup": {
            "from": "address",
            "localField": "addressId",
            "foreignField": "_id",  # Field in the other collection
            "as": "addresses" 
        }
    },
    {
        "$project": {
            "_id": 1,
            "phoneNo": 1,                       
            "notification": 1,                  
            "updatedAt": 1,
            "lastLoggedInAt": 1,   
            "addresses": 1
        }
    }
]   
    response = list(CustomerModel.objects.aggregate(pipeline))
    for doc in response:
        doc["_id"] = str(doc["_id"])
        for address in doc.get("addresses", []):
            address["_id"] = str(address["_id"])
    return ResponseUtil.createResponse(response)