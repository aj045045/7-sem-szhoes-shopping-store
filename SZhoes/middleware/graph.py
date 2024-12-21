from flask import Flask, render_template
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from pymongo import MongoClient
import matplotlib.dates as mdates
app = Flask(__name__)

plt.switch_backend('Agg')


class MongoCollection:
    client = MongoClient("mongodb://localhost:27017/")
    db = client['szhoes']

    @staticmethod
    def get_collection(collection_name: str):
        if collection_name in MongoCollection.db.list_collection_names():
            return MongoCollection.db[collection_name]
        else:
            raise ValueError(f"Collection '{collection_name}' does not exist.")


class ImagePlot:
    @staticmethod
    def plot_image(plot_func, title='Plot', xlabel='', ylabel=''):
        """Create and encode graph for plotting"""
        plt.figure(figsize=(12,8))
        plot_func()
        
        # Major operation
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        # Save the plot to a BytesIO object
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        plt.close() 
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        return img_base64


@app.route('/')
def graph():
    display = 'createdAt'
    start_date = pd.to_datetime('2022-01-01T00:00:00.000Z')
    end_date = pd.to_datetime('2024-12-31T23:59:59.999Z')
    pipeline = [
            {
                '$match': {
                    display: {
                        '$gte': start_date,
                        '$lt': end_date
                    }
                }
            },
            {
                '$project': {
                    display: 1,
                    '_id': 0
                }
            }
        ]

    
    # Fetch the customer collection and execute the aggregation
    collection = MongoCollection().get_collection('feedback')
    results = collection.aggregate(pipeline)
    df = pd.DataFrame(list(results))
    if df.empty:
        raise Exception("No customer data found for the specified date range.")
    df[display] = pd.to_datetime(df[display])
    def plot_func():
        """
        Helper function to plot the customer growth line chart.
        This function is used to plot a line chart of customer access
        based on the start and end dates.
        """
        x = df[display]
        y = [1] * len(df)  # Represents each customer as a data point
        plt.xlim(start_date, end_date)
        date_gap = int((end_date - start_date).days / 10)
        plt.plot(x, y, 'o', label='Customer', color='green')
        plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%d-%m-%Y'))
        plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=date_gap))
        plt.gcf().autofmt_xdate()
        plt.ylim(0, int(max(y)) + 5)
        plt.grid(True)
        plt.legend()
        plt.tight_layout()
        plt.subplots_adjust(left=0.049, top=0.95, bottom=0.13)
    
    src = ImagePlot.plot_image(
        plot_func,
        title='Notification Preferences Distribution',
        xlabel="No. of Customer",
        ylabel="Time"
    )
    
    return render_template('graph.html', title="Customer Chart", src=src)

if __name__ == "__main__":
    app.run(debug=True,port=5004)


# 2024-09-12T18:30:00.000Z - 2024-10-12T18:30:00.000Z