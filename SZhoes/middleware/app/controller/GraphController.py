from flask import Blueprint, request
from ..service.GraphService import GraphService
from . import ResponseUtil

GraphController_bp = Blueprint("graph", __name__,url_prefix="/graph")

@GraphController_bp.route('/customer', methods=['GET'])
def customerGrowthLineChart():
    """
    Generate a line chart representing customer growth over a specified time period.

    This endpoint handles requests to `/customer` and creates a line chart
    based on the number of system accesses by customers within a defined date range.

    Query Parameters:
        - startDate: The start date for the time series data.
        - endDate: The end date for the time series data.
        - display: The type of diagram to generate for the customer.

    Returns:
        - status: The status of the request
        - data: The encoded PNG image of the generated line chart.
    """
    startDate = request.args.get("startDate")
    endDate = request.args.get("endDate")
    display = request.args.get("display")
    encode = GraphService.customer_growth_line_chart(startDate, endDate, display)
    return ResponseUtil.createResponse(encode)

@GraphController_bp.route('/customer/notification',methods=['GET'])
def customerNotificationPieChart():
    """
    Create a pie chart representing the notification data over a specific time period
    
    This endpoint is used ot handle the request and create a pie chart based on the
    number of system access by customers within a defined date range.
    
    Returns:
        - status: The status of the request
        - data: The encoded PNG image of the generated pie chart
    """
    encoded = GraphService.customer_notification_pie_chart()
    return ResponseUtil.createResponse(encoded)

@GraphController_bp.route('/feedback',methods=['GET'])
def feedbackLineChart():
    """
    Create a line chart on base of data to be displayed
    
    This endpoint is used to handle the request form the feedback and create a line chart 
    based on to identify the number of chart to be created in the system
    
    Query Parameters:
        - startDate: The start date for the time series data
        - endDate: The end date of the time series data
    
    Return:
        - status: The status of the request
        - data: JSON
            - image: The encoded PNG image of the generated line chart
            - noOfFeedback: The number of feedback in the system
    """
    startDate = request.args.get("startDate")
    endDate = request.args.get("endDate")
    image = GraphService.feedback_line_chart(startDate,endDate)
    return ResponseUtil.createResponse(image)