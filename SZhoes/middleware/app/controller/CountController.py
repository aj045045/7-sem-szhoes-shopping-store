from flask import Blueprint
from ..service.CountService import CountService
from . import ResponseUtil

CountController_bp = Blueprint("count",__name__,url_prefix="/count")

@CountController_bp.route("/feedback",methods=['GET'])
def FeedbackCount():
    """
    Count no of feedback
    
    This method is used to get the number of document stored in the feedback document
    """
    count = CountService.countCollection('feedback')
    return ResponseUtil.createResponse(count)

@CountController_bp.route("/category",methods=["GET"])
def CategoryCounter():
    """
    Count the no of category and their document
    
    This method is used to get the number of category stored on based of tags
    """
    count = CountService.categoryCounter()
    return ResponseUtil.createResponse(count)