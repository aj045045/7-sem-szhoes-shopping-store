import os
import cv2
from werkzeug.utils import secure_filename
import rembg
import base64

class ImageService:
    """
    Service class for image processing and management.

    This class provides static methods to handle image-related tasks such as uploading images, 
    converting them to WebP format, removing backgrounds, and serving images as base64 strings.
    """

    @staticmethod
    def __get_file_name(file_name):
        """
        Extract the filename and extension from a given file name.

        This method splits a file name into its base name and extension.
        
        Parameters:
            - file_name (str): The name of the file to extract the base name and extension from.

        Returns:
            - tuple: A tuple containing the base name and extension of the file.
        """
        return os.path.splitext(file_name)

    @staticmethod
    def __convert_to_webp(input_path):
        """
        Convert an image file to WebP format.

        This method reads the image at the specified `input_path` using OpenCV,
        converts it to WebP format, and saves it back with 50% quality.

        Parameters:
            - input_path (str): The file path of the image to convert to WebP format.

        Raises:
            - ValueError: If the image could not be read from the specified path.
        """
        img = cv2.imread(input_path)
        if img is not None:
            cv2.imwrite(input_path, img, [int(cv2.IMWRITE_WEBP_QUALITY), 50])
        else:
            raise ValueError(f"Failed to read image from {input_path}")

    @staticmethod
    def __remove_background(input_file, output_file):
        """
        Remove the background from an image and save the output.

        This method reads an image from the `input_file`, removes its background using the `rembg` library, 
        and writes the result to `output_file`.

        Parameters:
            - input_file (str): The path of the input image file.
            - output_file (str): The path where the processed image will be saved.
        """
        with open(input_file, "rb") as f_in:
            with open(output_file, "wb") as f_out:
                f_out.write(rembg.remove(f_in.read()))

    @staticmethod
    def create_image(file, fileName: str, imageType: str) -> str:
        """
        Upload, process, and save an image in WebP format with background removal.

        This method handles the entire image processing pipeline:
        1. Validate the file extension.
        2. Save the uploaded image to a temporary folder.
        3. Convert the image to WebP format.
        4. Remove the image background.
        5. Save the final image in the specified image type folder.

        Parameters:
            - file (FileStorage): The uploaded image file.
            - fileName (str): The name of the uploaded file.
            - imageType (str): The type of image folder (e.g., profile, product).

        Returns:
            - str: The name of the processed image file in WebP format.

        Raises:
            - ValueError: If the file has an invalid extension.
            - RuntimeError: If an error occurs during image processing.
        """
        tmp_folder_name = "./static/tmp/"
        image_folder_name = f"./static/{imageType}/"
        
        # Validate file extension
        fileOldName, extension = ImageService.__get_file_name(fileName)
        allowed_extensions = {'.png', '.jpg', '.jpeg'}
        if extension.lower() not in allowed_extensions:
            raise ValueError(f"Invalid file extension: {extension}")
        
        # Generate UUID and secure filename
        file_name = secure_filename(fileName)
        file_path = os.path.join(tmp_folder_name, file_name)
        
        # Save uploaded file
        file.save(file_path)
        
        try:
            # Convert to WebP
            ImageService.__convert_to_webp(file_path)

            # Remove background and save to final image folder
            final_file_name = secure_filename(f"{fileOldName}.webp")
            final_file_path = os.path.join(image_folder_name, final_file_name)
            ImageService.__remove_background(file_path, final_file_path)

        # Convert the final image to base64
            with open(final_file_path, "rb") as f:
                image_base64 = base64.b64encode(f.read()).decode('utf-8')

            # Save the base64 content to a file
            base64_file_name = secure_filename(f"{fileOldName}.txt")
            base64_file_path = os.path.join(image_folder_name, base64_file_name)
            with open(base64_file_path, "w") as base64_file:
                base64_file.write(image_base64)

            # Clean up temporary and processed files
            os.remove(file_path)
            os.remove(final_file_path)
        except Exception as e:
            raise RuntimeError(f"Failed to process image: {str(e)}")
        return final_file_name
    
    @staticmethod
    def find_image(image_path: str) -> str:
        """
        Retrieve and return the content of a .base64 file as a string.
        This method reads a .base64 file from the given path and returns its content.

        Parameters:
            - image_path (str): The full path to the .base64 file.
        Returns:
            - str: The base64-encoded string of the image content.
        Raises:
            - ValueError: If the specified file does not have a .base64 extension.
            - FileNotFoundError: If the specified file does not exist.
        """
        # if not image_path.lower().endswith('.txt'):
            # raise ValueError(f"The file '{image_path}' is not a valid .base64 file.")
        # Read the .base64 file
        try:
            with open(f"./static{image_path}", 'r') as base64_file:
                img_base64 = base64_file.read()
            return img_base64
        except FileNotFoundError:
            raise FileNotFoundError(f"The file '{image_path}' does not exist.")

    
    @staticmethod
    def update_image():
        """
        Placeholder method for updating an image.

        This method is a placeholder for updating images stored in the system.
        It is not implemented yet.
        """
        pass
    
    @staticmethod
    def delete_image(imgId:str) :
        """
        Placeholder method for deleting an image.

        This method is a placeholder for deleting images stored in the system.
        It is not implemented yet.
        """
        path = f"./static/{imgId}"
        if os.path.isfile(path):
            os.remove(path)
