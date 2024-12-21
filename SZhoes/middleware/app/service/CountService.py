from . import MongoCollection

class CountService:
    
    @staticmethod
    def countCollection(db):
        collection = MongoCollection().get_collection(db)
        return collection.count_documents({})
    
    @staticmethod
    def categoryCounter():
        pipeline = [
            {"$match": {"isActive": True}},
            {"$unwind": "$tag"},
            {"$group": {
                "_id": "$tag", 
                "count": {"$sum": 1}
            }},
            {"$sort": {"count": -1}},
        ]
        collection = MongoCollection().get_collection('category')
        result = list(collection.aggregate(pipeline))
        return result