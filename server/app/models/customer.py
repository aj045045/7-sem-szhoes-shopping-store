from mongoengine import *
from datetime import datetime

class CustomerModel(Document):
    name = StringField(required=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    phoneNo = StringField()
    addressId = ListField(ObjectIdField())
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