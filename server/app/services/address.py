from app.models.address import AddressModel
from app.models.customer import CustomerModel
from bson import ObjectId

class AddressService:
    
    @staticmethod
    def addAddress(customerId,street,city,state,country,zip_code):
        if not (street and city and state and country and zip):
            raise Exception("Value missing")
        user = CustomerModel.objects(id=customerId).first()
        if not user:
            raise Exception("Customer not found")
        model = AddressModel()
        model.street = street
        model.city = city
        model.state = state
        model.country = country
        model.zip = str(zip_code)
        model.save()
        user.addressId.append(model.id)
        user.save()
    
    @staticmethod
    def updateAddress(addressId,street,city,state,country,zip_code):
        if not (street and city and state and country and zip):
            raise Exception("Value missing")
        address = AddressModel.objects(id=addressId).first()
        if not address:
            raise Exception("Address not found")
        address.street = street
        address.city = city
        address.state = state
        address.country = country
        address.zip = zip_code
        address.save()
        
    @staticmethod
    def deleteAddress(addressId,customerId):
        address = AddressModel.objects(id=addressId).first()
        customer = CustomerModel.objects(id=customerId).first()
        if not address:
            raise Exception("Address not found")
        customer.addressId.remove(ObjectId(addressId))
        address.delete()
        customer.save()
