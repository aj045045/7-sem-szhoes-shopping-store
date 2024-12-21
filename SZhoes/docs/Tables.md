# Tables

### Customer

- CustomerId
- Name 
- Email
- Password 
- AddressId : Array[]
- PhoneNo
- notification : Map< string, Boolean >
- Cart : Array[]{[key: ItemId] : timestamp}
- Wishlist : Array[]{[key: ItemId] : timestamp}
- createdAt
- lastLoggedAt


### Address

- AddressId
- Street
- City
- State
- Country
- zip


### Product

- ProductId
- Name
- Title
- CategoryId : Array[]
- ItemId : Array[]
- About
- Description : Embedded{}
    [key:string] : string
- ReferenceProductId : Array[]
- Images : Array[]
- createdAt 
- updatedAt
- isActive


### Item

- ItemId
- Size
- Price
- Discount : Embedded{}
    - DiscountPercentage
    - SaleStart
    - SaleEnd
    - updatedAt
- Images : Array[]
- Color
- Detail : Embedded{}
    [key:string] : string
- createdAt
- updatedAt
- isActive


### Inventory

- InventoryId
- ProductId
- WarehouseId
- Quantity
- MaxReorderLevel
- MinReorderLevel
- lastRestockAt : Array[]


### Order

- OrderId
- OrderNumber
- CustomerId
- EmployeeId
- Status : ENUM[ORDERED, PROCESSING, SHIPPED, INTRANSIT, DELIVERED, RETURNED, CANCELED, ONHOLD, UNDER_REVIEW]
- ItemId
- Amount
- AddressId
- PaymentId
- ShippingId
- orderedAt
- deliveredAt


### Payment 

- PaymentId
- PaymentMetod : ENUM [CREDIT_CARD, DEBIT_CARD, CASH_ON_DELIVERY, UPI]
- Amount
- Status : ENUM [PENDING, COMPLETED, REFUNDED, DISPUTED ]
- TransactionDetail
- paymentAt


### Shipping

- ShippingId
- ShippingMethod : ENUM [STANDARD, EXPRESS, OVER_NIGHT, TWO_DAY, SAME_DAY, INTERNATIONAL, FREIGHT, COURIER, DROP, SPCIAL]
- ShippingCost
- detail
- cost
- TrackingNumber
- AddressId : ( Address of Port )
- shippedAt
- reachedAt


### Category

- CategoryId
- Title
- IsActive


### Review

- ReviewId
- ProductId
- CustomerId
- Rating
- Description
- Images
- reviewedAt


### Return

- ReturnId
- OrderId
- EmployeeId
- Status
- RefundAmount
- refundedAt
- returnedAt
- receivedAt


### Blog

- BlogId
- Title
- Description
- Images : Array[]
- ProductId : Array[]
- CategoryId : Array[] 
- updatedAt


### FAQ

- FaqId
- Question
- Answer
- CategoryId : Array[]


### Feedback

- FeedbackId
- Email
- Description


### Supplier

- SupplierId
- ContactId
- Organization
- MaterialId : Array[]
- IsActive


### Purchase

- PurchaseId
- SupplierId
- item : Emebedded Array [{}]
      MaterialId
      Quantity
      price
- Amount
- PaymentId
- purchasedAt
- receivedAt


### Material

- MaterialId
- Name
- Description
- UnitOfMeasure : ENUM [PIECE, KG, LITER, METER, SQUAREMETER, CUBICMETER, FOOT, YARD, OUNCE, POUND]
- CostPerUnit
- createdAt
- updatedAt
- IsActive


### Manufacturing

- ManufacturingId
- ManufacturingMaterialId
- Quantity
- Amount
- startedAt
- endedAt
- createdAt
- updatedAt


### ManufacturingMaterial

- ManufacturingMaterialId
- ProductId
- Items : Embedded{}
  - MaterialId
  - Quantity
- Amount
- updatedAt


### Warehouse

- WarehouseId
- Name
- AddressId
- EmployeeId
- Capacity
- UsedCapacity
- Status : ENUM [ACTIVE, INACTIVE, UNDER_MAINTENANCE, CLOSED, PENDING, SUSPENDED ]


### Department

- DepartmentId
- Title
- EmployeeId #NOTE - Employee As Manager
- Description
- IsActive


### Role

- RoleId
- JobTitle
- DepartmentId
- Description
- Permissions : Embedded{}
  - [key:string] : value
          key = ENUM : [ATTENDANCE,BLOG,CART,CATEGORY,COMPLAINT,CONTACT,CUSTOMER,DASHBOARD,DEPARTMENT,EMPLOYEE,PRODUCT,EXPENSES,FAQ,COMPLAINT,INCOME,INVENTORY,MANUFACTURING,MATERIAL,ORDER,REVIEW,RETURN,ROLE,SALES,SELLER,SUPPLIER,WAREHOUSE,WISHLIST,CART]
          value = ENUM : [VIEW, UPDATE, DELETE, CREATE, DEACTIVE]
  eg: feedback: VIEW
- isActive


### Employee

- EmployeeId
- ContactId
- RoleId
- password
- Salary
- Resume
- hiredAt
- updatedAt
- isActive


### Attendance

- EmployeeId
- checkInAt
- checkOutAt
- status : ENUM [PRESENT, ABSENT, LATE, LEAVE, HALF_DAY]
- updatedAt


### Payroll

- PayrollId
- EmployeeId
- Salary
- Bonus
- Deductions
- NetPay
- payedAt
- updatedAt


### CashFlow

- CashFlowId
- Title
- Description
- Tag : ENUM [INCOME, EXPENSE]
- Amount
- updatedAt


### Seller

- SellerId
- ContactId
- Organization
- ProductId
- QuantitySold
- isActive


### Chat

- ChatId
- SenderId: EmployeeId - Sender
- ReceiverId: EmployeeId - Receiver
- Message
- File?
- isReaded
- createdAt


### Project

- ProjectId
- Title
- Description
- status
- ManagerId: EmployeeId
- Budget
- createdAt
- updatedAt
- startedAt
- endedAt
- teamId: EmployeeId Array[]
- Document : Array[]


### Contact

- FirstName
- LastName
- Email
- AddressId : Array[]
- Profile
- PhoneNo
- MobileNo
- Note
- createdAt
- updatedAt


## List of Tables

1.  Customer
2.  Address
3.  Product
4.  Item
5.  Inventory
6.  Order
7.  Payment
8.  Shipping
9.  Category
10. Review
11. Return
12. Blog
13. FAQ
14. Feedback
15. Supplier
16. Purchase
17. Material
18. Manufacturing
19. ManufacturingMaterial
20. Warehouse
21. Department
22. Role
23. Employee
24. Attendance
25. Payroll
26. CashFlow
27. Seller
28. Chat
29. Project
30. Contact


# Modules

## Completed
- Customer
- Feedback
- Category
- Product

## Pending
- Blog
- FAQs
  - Department
  - Employee
  - Warehouse
- Inventory
- Manufacturing
  - Payment
  - Shipping
- Order
- Return
- Material
- Supplier
- Purchase
- Attendance
- Payroll
- CashFlow
- Seller
- Chat
- Project

## List
- Customer
- Product
- Order
- Return
- Blog
- FAQ
- Feedback
- Purchase
- Material
- Manufacturing
- Warehouse
- Employee
- Attendance
- Payroll
- CashFlow
- Seller
- Chat
- Project