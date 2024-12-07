from flask import request
from . import ResponseUtil
from app.services.faq import FaqService
def faqBot():
    text = request.args.get("text")
    data = FaqService.faqBot(text)
    return ResponseUtil.createResponse(data)
