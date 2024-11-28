from mongoengine import Document, StringField

class AddressModel(Document):
    street = StringField(required=True)
    city = StringField(required=True)
    state = StringField(required=True)
    country = StringField(required=True)
    zip = StringField(required=True)

    meta = {
        'collection': 'address'
    }
