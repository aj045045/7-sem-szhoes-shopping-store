# Tables

> Customer \
> Product \
> Inventory \
> Discount \
> Order \
> Category \
> Cart \
> Review \
> Wishlist \
> Return \
> Blog \
> FAQ \
> Feedback \
> Supplier \
> Purchase \
> Warehouse \
> Invoice \
> Sale \
> Manufacturing \
> Manufacturing_Step \
> Role \
> Employee \
> Attendance \
> Department \
> Payroll \
> Accounting \
> Expenses \
> Employee_chat \ 
> Message \
> Vendor \


### Table not used

> Coupons \
> Notification \
> Promotions \
> Banners \
> Logs \
> Analytics \
> GiftCards \
> Subscriptions \
> Tickets \
> Settings

## Logging

Logging in JSON format is a structured way to capture and store log messages that can be easily parsed and analyzed by systems or tools. Here’s an example format for logging in JSON:

```json
{
  "timestamp": "2024-06-22T12:30:45Z",
  "level": "INFO",
  "logger": "recommendation_system",
  "message": "Generated recommendations for user",
  "user_id": "123456789",
  "context": {
    "page": "homepage",
    "section": "recommended_products"
  },
  "recommendations": [
    {
      "product_id": "P12345",
      "name": "Product A",
      "category": "Electronics",
      "score": 0.85
    },
    {
      "product_id": "P67890",
      "name": "Product B",
      "category": "Clothing",
      "score": 0.72
    },
    {
      "product_id": "P24680",
      "name": "Product C",
      "category": "Home & Kitchen",
      "score": 0.65
    }
  ]
}
```

### Explanation of Fields:

- **timestamp**: The timestamp when the log message was created. It's typically in ISO 8601 format for universal readability.
- **level**: The severity level of the log message, such as INFO, DEBUG, WARN, ERROR, or FATAL.
- **logger**: The name or identifier of the component or module that generated the log message (e.g., recommendation_system).
- **message**: A concise description of the log message or event.
- **user_id**: The unique identifier of the user for whom recommendations were generated.
- **context**: Additional contextual information related to the log message. Here, it includes the page and section of the website where recommendations were generated.
- **recommendations**: An array containing details of the recommended products. Each recommendation includes:
  - **product_id**: Unique identifier of the recommended product.
  - **name**: Name or title of the product.
  - **category**: Category to which the product belongs.
  - **score**: Relevance score assigned to the product based on the recommendation algorithm.

### Benefits of JSON Logging:

- **Structured Data**: JSON format provides a clear structure for log data, making it easier to parse and analyze using automated tools or systems.
- **Flexibility**: JSON allows nesting of objects and arrays, accommodating complex data structures within a single log entry.
- **Interoperability**: JSON is widely supported across programming languages and platforms, facilitating integration with various logging frameworks and analytics tools.

Implementing logging in JSON format ensures that your recommendation system logs are well-organized, readable, and suitable for efficient monitoring, troubleshooting, and analysis of user interactions and system behavior.

## Emails types

- Order Confirmation
- Shipping Confirmation
- Delivery Confirmation
- Transactional Emails
- Promotional Emails
- Abandoned Cart Emails
- Customer Feedback Emails
- Subscription Emails
- Returns and Refunds

## Email Address convention

1. **noreply@[domain]**: Used for automated emails where replies are not monitored or expected.
2. **info@[domain]**: General purpose email address for inquiries or information requests.
3. **support@[domain]**: For customer support inquiries.
4. **sales@[domain]**: For inquiries related to sales or business opportunities.
5. **contact@[domain]**: General contact email address.
6. **billing@[domain]**: For billing-related inquiries.
7. **admin@[domain]**: For administrative purposes.
8. **hr@[domain]**: For human resources inquiries.
9. **marketing@[domain]**: For marketing-related inquiries.
10. **feedback@[domain]**: For providing feedback or suggestions.
