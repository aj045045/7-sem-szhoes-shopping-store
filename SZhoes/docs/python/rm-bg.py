# Importing Required Modules 
from rembg import remove 
from PIL import Image 

def remove_bg_image(input_path,output_path):
    input_image = Image.open(input_path) 
    output_image = remove(input_image) 
    output_image.save(output_path) 
    
input_path = "./image/images.jpeg"
output_path = "./image/remove-bg/rm-image-shoes-2.jpeg"
