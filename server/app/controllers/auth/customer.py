from flask import request, jsonify
from app.services.auth.customer import CustomerService
from . import ResponseUtil

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
    return ResponseUtil.createResponseMessage('Thank you for registering', 201)

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
