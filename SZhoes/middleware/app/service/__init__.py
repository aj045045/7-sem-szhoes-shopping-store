from pymongo import MongoClient
import io
import base64
import matplotlib.pyplot as plt

client = MongoClient("mongodb://localhost:27017/")
db = client['szhoes']

class MongoCollection:
    """
    Class for managing MongoDB connections to the `szhoes` database.

    This class provides methods to connect to the MongoDB database 
    and perform operations on the specified collections.

    Attributes:
        - client (MongoClient): The MongoDB client instance.
        - db (Database): The `szhoes` database instance.
    """
    client = MongoClient("mongodb://localhost:27017/")
    db = client['szhoes']

    @staticmethod
    def get_collection(collection_name: str):
        """
        Retrieve a MongoDB collection by name.

        This method checks if the specified collection exists and 
        returns the corresponding collection object.

        Parameters:
            collection_name (str): The name of the collection to access.

        Returns:
            Collection: The MongoDB collection object.

        Raises:
            ValueError: If the specified collection does not exist.
        """
        if collection_name in MongoCollection.db.list_collection_names():
            return MongoCollection.db[collection_name]
        else:
            raise ValueError(f"Collection '{collection_name}' does not exist.")


class ImagePlot:
    """
    Class for creating and encoding plots using Matplotlib.

    This class provides methods to generate plots and convert them 
    to base64 encoded format for easy storage or transmission.
    """
    
    @staticmethod
    def plot_image(plot_func, xlabel='', ylabel=''):
        """
        Generate a plot and return it as a base64 encoded string.

        This method executes a provided plotting function, 
        configures the plot's appearance, and encodes the result 
        in base64 format for easy transfer.

        Parameters:
            plot_func (callable): A function that creates the plot.
            title (str): The title of the plot. Defaults to 'Plot'.
            xlabel (str, optional): The label for the X-axis. Defaults to 'X-axis'.
            ylabel (str, optional): The label for the Y-axis. Defaults to 'Y-axis'.

        Returns:
            str: A base64 encoded string representing the generated plot.
        """
        plt.figure(figsize=(12, 8))
        plot_func()
        
        # Configure plot appearance
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        
        # Save the plot to a BytesIO object
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        plt.close() 
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        return img_base64
