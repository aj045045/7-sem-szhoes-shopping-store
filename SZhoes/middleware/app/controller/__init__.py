"""
Class use to create a response

This class is used to create a response that
help to manage response
"""
class ResponseUtil:
    
    @staticmethod
    def createResponse(data):
        """
        This method is used to create a response with `status` and `data`
        """
        return {
            "status":"success",
            "data":data
        }