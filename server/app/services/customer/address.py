from app.models.address import AddressModel

class AddressService:
    
    @staticmethod
    def addAddress(street,city,state,country,zip):
        if not (street and city and state and country and zip):
            raise Exception("Value missing")
        model = AddressModel()
        model.street = street
        model.city = city
        model.state = state
        model.country = country
        model.zip = zip
        model.save()
        