from . import MongoCollection

class AggregationService:
    
    @staticmethod
    def getProductList():
        pipeline = [
        {
            "$addFields": {                   # Convert categoryId to ObjectId
                "categoryId": {
                    "$convert": {
                        "input": "$categoryId",
                        "to": "objectId",
                        "onError": None        # Set to None if conversion fails
                    }
                }
            }
        },
        {
            "$lookup": {
                "from": "category",           # Name of the category collection
                "localField": "categoryId",    # Converted categoryId
                "foreignField": "_id",         # Field from category collection
                "as": "categoryInfo"           # Output array field from lookup
            }
        },
        {
            "$unwind": "$categoryInfo"          # Unwind the categoryInfo array
        },
        {
            "$project": {
                "_id": { "$toString": "$_id" },  # Convert _id to string
                "name": 1,
                "itemCount": { "$size": "$itemIds" },  # Count the number of elements in itemIds array
                "category": {
                    "$concat": [                   # Concatenate tag and title with " -> "
                        "$categoryInfo.tag",
                        " -> ",
                        "$categoryInfo.title"
                    ]
                },
                "categoryId": { "$toString": "$categoryId" }  # Convert categoryId to string
            }
        }
    ]
        collection = MongoCollection().get_collection('product')
        return list(collection.aggregate(pipeline))
