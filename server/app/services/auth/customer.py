from flask_jwt_extended import create_access_token
from app.models.customer import CustomerModel
import bcrypt
from flask import session

class CustomerService():
    
    @classmethod
    def hash_password(cls, password):
        """
        Hashes the password using a secure hashing algorithm
        """
        hash_password = bcrypt.hashpw(password,bcrypt.gensalt())
        return hash_password.decode()
    
    @classmethod
    def check_password(cls,password,hash_password):
        return bcrypt.checkpw(password,hash_password)
    
    @staticmethod
    def registerCustomer(name, email, phoneNo, password, generatedOtp, otp):
        if not generatedOtp == otp:
            raise Exception("Generated Otp and entered Otp doesn't match")
        
        if CustomerModel.objects(email=email).first():
            raise Exception("A customer with this email already exists.")
        
        customer = CustomerModel()
        customer.name = name
        customer.email = email
        customer.phoneNo = phoneNo
        customer.password = CustomerService.hash_password(password.encode())
        customer.save()

    @staticmethod
    def getAllEmail():
        users = CustomerModel.objects.only('email')
        return [user.email for user in users]
        
    @staticmethod
    def loginCustomer(emailId, password):
        user = CustomerModel.objects(email=emailId).first()
        match = CustomerService.check_password(password.encode(),user.password.encode())
        responseData = {}
        if match:
            responseData['token'] = create_access_token(identity=user.email)
            session['user'] = 'customer'
            session['email'] = str(user.email)
            data = user.to_json()
            response = {}
            response['cart'] = data['cart']
            response['email'] = data['email']
            response['id'] = data['id']
            response['name'] = data['name']
            responseData['user'] = response
            return responseData
        raise Exception("Email ID or Password is not correct")

    @staticmethod
    def forgetPassword(email, generateOtp, otp, newPassword, confirmPassword):
        if not generateOtp == otp:
            raise Exception("Otp is not matched")
        if not newPassword == confirmPassword:
            raise Exception("New Password is not matched with confirm Password")
        
        customer = CustomerModel.objects.get(email=email)
        hashed_password = CustomerService.hash_password(newPassword.encode())
        customer.password = hashed_password
        customer.save()
