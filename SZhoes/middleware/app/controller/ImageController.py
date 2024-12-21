from flask import Blueprint, request
from flask_restful import Resource, Api
from ..service.ImageService import ImageService
import base64, io
from PIL import Image
from . import ResponseUtil
import json


ImageController_bp = Blueprint("image", __name__)
api = Api(ImageController_bp)


class ImageController(Resource):
    """
    RESTful controller for managing image storage.

    This controller provides endpoints for handling CRUD operations 
    related to image storage, including storing, retrieving, 
    updating, and deleting images.
    """
    
    def get(self):
        """
        Retrieve an image in base64 encoded format.

        This method retrieves an image based on the provided 
        parameters and returns it in base64 encoded format.

        Query Parameters:
            - name: The name of the image to retrieve.
            - type: The folder type to search for the image.

        Returns:
            - status: The status of the request (e.g., "success").
            - data: The base64 encoded image string, or an error message if not found.
        """
        imageName = request.args.get("name")
        res = []
        imageName = json.loads(imageName)
        for img in imageName:
            res.append(ImageService.find_image(img))
        return ResponseUtil.createResponse(res) 

    def post(self):
        """
        Store an image in WEBP format.

        This method accepts a base64 encoded image, converts it to 
        WEBP format, and stores it with a random filename.

        Request Body (JSON):
            {
                image: Base64 encoded image string,
                filename: Original Filename,
                type: The image type
            }

        Returns:
            - status: The status of the request (e.g., "success").
            - data: The newly created name of the stored image.
        """
        data = request.get_json()
        key = request.args.getlist("key")
        for k in key:
            for item in data[k]:
                img_data = item.get("image")
                img_uuid = item.get("uuid")
                image_data = base64.b64decode(img_data)
                image = Image.open(io.BytesIO(image_data))
                ImageService.create_image(image, img_uuid,k)
        return ResponseUtil.createResponse("Thanks for submission")
    
    def delete(self):
        """
        Delete an existing image.

        This method would handle the deletion of an image. 
        (Implementation to be added.)
        """
        deleteId = request.args.get("id")
        ImageService.delete_image(deleteId)
        return ResponseUtil.createResponse("Thanks for delete images")

api.add_resource(ImageController, '/image','/image/')
