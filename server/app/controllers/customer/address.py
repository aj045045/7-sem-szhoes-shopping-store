from flask import request
from app.services.customer.address import AddressService
from . import ResponseUtil

def addAddress():
    data = request.get_json()
    street = data['street']
    city = data['city']
    state = data['state']
    country = data['country']
    AddressService.addAddress(street,city,state,country,zip)
    return ResponseUtil.createResponseMessage("New address added")