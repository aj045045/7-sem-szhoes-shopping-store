from app.models.customer import CustomerModel
from bson import ObjectId

class CustomerService:
    
    @staticmethod
    def getCustomerDetail(customerId:str):
        customer = CustomerModel.objects(id=customerId).first()
        response = {}
        response['phoneNo'] = customer.phoneNo
        response['addressId'] = customer.addressId
        response['notification'] = customer.notification
        response['updatedAt'] = customer.updatedAt
        response['lastLoggedInAt'] = customer.lastLoggedInAt
        customer_id = ObjectId(customerId)
        pipeline = [
        {
            '$match': {
                '_id': customer_id  # Match by the given customerId
            }
        },
        {
            '$unwind': '$addressId'
        },
        {
            '$lookup': {
                'from': 'address',           # Address collection name
                'localField': 'addressId',   # The field in the CustomerModel
                'foreignField': '_id',       # The field in the AddressModel
                'as': 'address'              # Output field for the matched addresses
            }
        },
        {
            '$project': {
                'phoneNo': 1,                       # Include phoneNo
                'notification': 1,                  # Include notification settings
                'updatedAt': 1,                     # Include updatedAt
                'lastLoggedInAt': 1,                # Include lastLoggedInAt
                'address.street': 1,                # Include street from the AddressModel
                'address.city': 1,                  # Include city from the AddressModel
                'address.state': 1,                 # Include state from the AddressModel
                'address.country': 1,               # Include country from the AddressModel
                'address.zip': 1                    # Include zip from the AddressModel
            }
        }
    ]

        result = CustomerModel.objects.aggregate(pipeline)
        return response