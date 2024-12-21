import pandas as pd
import matplotlib.pyplot as plt
from pymongo import MongoClient
from bson import ObjectId

plt.switch_backend('Agg')


class MongoCollection:
    client = MongoClient("mongodb://localhost:27017/")
    db = client['szhoes']

    @staticmethod
    def get_collection(collection_name: str):
        if collection_name in MongoCollection.db.list_collection_names():
            return MongoCollection.db[collection_name]
        else:
            raise ValueError(f"Collection '{collection_name}' does not exist.")

def graph():
# Define the aggregation pipeline

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
    # Execute the aggregation
    result = list(collection.aggregate(pipeline))
    for doc in result:
        print(doc)

if __name__ == "__main__":
    graph()

# 2024-09-12T18:30:00.000Z - 2024-10-12T18:30:00.000Z