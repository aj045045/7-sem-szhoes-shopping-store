from app.models.customer import CustomerModel
from app.services.customer import CustomerService
from flask_jwt_extended import create_access_token
from app.models.customer import CustomerModel
from flask import session


class AdminService:
    
    @staticmethod
    def loginAdmin(emailId, password):
        user = CustomerModel.objects(email=emailId).first()
        match = CustomerService.check_password(password.encode(),user.password.encode())
        responseData = {}
        if match:
            responseData['token'] = create_access_token(identity=user.email)
            session['user'] = 'admin'
            session['id'] = str(user.id)
            data = user.to_json()
            response = {}
            response['cart'] = {}
            response['email'] = data['email']
            response['id'] = data['id']
            response['name'] = data['name']
            responseData['user'] = response
            responseData['role'] = 'admin'
            return responseData
        raise Exception("Email ID or Password is not correct")