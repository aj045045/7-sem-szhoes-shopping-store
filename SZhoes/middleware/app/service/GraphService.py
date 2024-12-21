from . import MongoCollection, ImagePlot
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
import matplotlib.dates as mdates

matplotlib.use('Agg')


class GraphService:
    """
    Service class for generating graphs using Matplotlib based on database insights.

    This class provides methods to create different types of graphs based on the MongoDB collections.
    These graphs are then returned as base64 encoded images for easy transfer or storage.
    """

    @staticmethod
    def customer_growth_line_chart(start_date, end_date, display):
        """
        Generate a line chart showing customer growth over time.

        This method creates a line chart that visualizes the number of customers
        who accessed the system between a specified start and end date. The graph 
        provides insights into customer growth over time.

        Parameters:
            - start_date (str): The start date of the time range.
            - end_date (str): The end date of the time range.
            - display (str): The field name to plot on the X-axis (typically a date field).

        Returns:
            - src (str): A base64 encoded string representing the generated line chart.
        
        Raises:
            - Exception: If no customer data is found for the specified date range.
        """
        start_date = pd.to_datetime(start_date)
        end_date = pd.to_datetime(end_date)
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
        collection = MongoCollection().get_collection('customer')
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
            xlabel='Time Period',
            ylabel='No of Customers'
        )
        return src

    @staticmethod
    def customer_notification_pie_chart():
        """
        Generate a pie chart for notification preferences.

        This method creates a pie chart representing the distribution of 
        different types of notifications (e.g., delivery, review, promotional, etc.)
        based on data retrieved from the database.

        Returns:
            - src (str): A base64 encoded string representing the generated pie chart.
        """
        pipeline = [
            {
                '$project': {
                    'delivery': {'$cond': [{'$eq': ['$notification.delivery', True]}, 1, 0]},
                    'review': {'$cond': [{'$eq': ['$notification.review', True]}, 1, 0]},
                    'promotional': {'$cond': [{'$eq': ['$notification.promotional', True]}, 1, 0]},
                    'return': {'$cond': [{'$eq': ['$notification.return', True]}, 1, 0]},
                    'order': {'$cond': [{'$eq': ['$notification.order', True]}, 1, 0]}
                }
            },
            {
                '$group': {
                    '_id': None,
                    'delivery': {'$sum': '$delivery'},
                    'review': {'$sum': '$review'},
                    'promotional': {'$sum': '$promotional'},
                    'return': {'$sum': '$return'},
                    'order': {'$sum': '$order'}
                }
            }
        ]
        
        collection = MongoCollection().get_collection('customer')
        result = list(collection.aggregate(pipeline))
        
        if result:
            # Prepare data for pie chart plotting
            counts = result[0]
            data = {
                'Notification Type': ['Delivery', 'Review', 'Promotional', 'Return', 'Order'],
                'Count': [
                    counts['delivery'],
                    counts['review'],
                    counts['promotional'],
                    counts['return'],
                    counts['order']
                ]
            }
            df = pd.DataFrame(data)
        else:
            df = pd.DataFrame(columns=['Notification Type', 'Count'])

        def plot_func():
            """
            Helper function to plot the notification pie chart.

            This function is used to plot a pie chart representing the 
            distribution of different notification types.
            """
            plt.pie(df['Count'], labels=df['Notification Type'], autopct='%1.f%%', startangle=90)
            plt.axis('equal')  # Ensures the pie chart is a circle
            plt.legend(title='Notification Types')
            plt.tight_layout()
        
        src = ImagePlot.plot_image(
            plot_func,
        )
        return src

    @staticmethod
    def feedback_line_chart(startDate,endDate):
        """
        Generate a line chart showing feedback over time.
        
        This method create a line chart that visualizes the number of customers
        who accessed the system between a specified start and end chart.
        
        Parameters:
            - startDate: The start date of the time range.
            - endDate: The end date of the time range
        
        Returns: 
            - src: A base64 encoded image representing the line chart
            
        Raises:
            - Exception: If no feedback is found for the specified data range
        """
        display = 'createdAt'
        start_date = pd.to_datetime(startDate)
        end_date = pd.to_datetime(endDate)
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
            plt.title('Feedback summary')
            plt.xlabel("No. of Feedback")
            plt.ylabel("Time")
            
        src = ImagePlot.plot_image(plot_func)
        return src
    