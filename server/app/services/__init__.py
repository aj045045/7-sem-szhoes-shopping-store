import io
import base64
import matplotlib.pyplot as plt

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
