from app.models.customer import CustomerModel
import bcrypt

class CustomerService():
    
    @staticmethod
    def registerCustomer(name, email, phoneNo, password, generatedOtp, otp):
        if not generatedOtp == otp:
            raise Exception("Generated Otp and entered Otp doesn't match")
        customer = CustomerModel()
        customer.name = name
        customer.email = email
        customer.phoneNo = phoneNo
        customer.password = CustomerService.hash_password(password.encode())
        customer.save()
        
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