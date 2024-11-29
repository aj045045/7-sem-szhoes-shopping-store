from app.models.address import AddressModel
from app.models.customer import CustomerModel

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
        print(str(model.id))
        user.addressId.append(str(model.id))
        user.save()