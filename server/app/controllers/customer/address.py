from flask import request
from app.services.address import AddressService
from . import ResponseUtil

def addAddress(customerId):
    data = request.get_json()
    street = data['street']
    city = data['city']
    state = data['state']
    country = data['country']
    zip_code = data['zip']
    AddressService.addAddress(customerId,street,city,state,country,zip_code)
    return ResponseUtil.createResponseMessage("New address added")

def updateAddress(addressId):
    data = request.get_json()
    street = data['street']
    city = data['city']
    state = data['state']
    country = data['country']
    zip_code = data['zip']
    AddressService.updateAddress(addressId,street,city,state,country,zip_code)
    return ResponseUtil.createResponseMessage("Address updated successfully")

def deleteAddress(addressId,customerId):
    AddressService.deleteAddress(addressId,customerId)
    return ResponseUtil.createResponseMessage("Address deleted")