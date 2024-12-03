from flask import request
from . import ResponseUtil
from app.services.vector import VectorService

def addFaq():
    data = request.get_json()
    print(data)
    vs = VectorService()
    vs.list_indexes()    
    return ResponseUtil.createResponseMessage("Faq added") 