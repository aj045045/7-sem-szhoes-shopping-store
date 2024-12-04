from flask import request
from . import ResponseUtil
from app.services.faq import FaqService

def addFaq():
    data = request.get_json()
    FaqService.addFaq(data['question'],data['answer'])
    return ResponseUtil.createResponseMessage("FAQ added") 

def getFaq():
    page = int(request.args.get('page', 1))  
    data = FaqService.getFaq(page)
    return ResponseUtil.createResponse(data)