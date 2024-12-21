from flask import Blueprint,request
from ..service.FeedbackService import FeedbackService
from ..service.AggregationService import AggregationService
from . import ResponseUtil

AggregationController_bp = Blueprint("aggregation",__name__,url_prefix="/aggregation")

@AggregationController_bp.route("/keys",methods=['GET'])
def feedbackKeys():
    service = FeedbackService()
    data = service.descriptionKeys()
    return ResponseUtil.createResponse(data)

@AggregationController_bp.route('/product',methods=['GET'])
def getProductList():
    return ResponseUtil.createResponse(AggregationService().getProductList())