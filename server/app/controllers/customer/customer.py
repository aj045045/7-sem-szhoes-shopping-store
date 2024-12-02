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

def updatePassword():
    data = request.get_json()
    password = data['password']
    newPassword = data['newPassword']
    confirmPassword = data['confirmPassword']
    CustomerService.updatePassword(password,newPassword,confirmPassword)
    return ResponseUtil.createResponseMessage("Password updated successfully")

def updateNotifications():
    data = request.get_json()
    CustomerService.updateNotifications(data)
    return ResponseUtil.createResponseMessage("Notification settings has been updated")

def deleteAccount():
    CustomerService.deleteAccount()
    return ResponseUtil.createResponseMessage("You account has been deleted!")    

def logOut():
    CustomerService.logOut()
    return ResponseUtil.createResponseMessage("You have logged out successfully")