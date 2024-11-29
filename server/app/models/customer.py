from mongoengine import Document, StringField, ListField,ObjectIdField,DictField,DateTimeField
from datetime import datetime

class CustomerModel(Document):
    name = StringField(required=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    phoneNo = StringField()
    addressId = ListField(StringField(),default=[])
    notification = DictField(default={
        'delivery': True,
        'review': True,
        'promotional': True,
        'return': True,
        'order': True
    })
    cart = DictField(default={})
    wishlist = DictField(default={})
    createdAt = DateTimeField(default=datetime.now)
    updatedAt = DateTimeField(default=datetime.now)
    loggedInAt = DateTimeField(default=datetime.now)
    lastLoggedInAt = DateTimeField(default=datetime.now)
    
    meta = {'collection': 'customer' }
    
    def to_json(self):
        # Convert the MongoDB document into a dictionary, ensuring we convert ObjectId to string
        data = self.to_mongo().to_dict()
        data['id'] = str(data['_id'])  # Convert ObjectId to string
        del data['_id']  # Remove _id from the dictionary as we added it as 'id'
        return data