# Backend Integration Guide

## Overview
Your Spring Boot backend endpoints are now integrated with your React frontend. All existing UI components can now connect to real backend APIs.

## Available Endpoints

### Products API (`/api/products`)
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/products/search?query={query}` - Search products
- `GET /api/products/status/{status}` - Filter by status
- `GET /api/products/category/{categoryId}` - Filter by category

### Customers API (`/api/customers`)
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `GET /api/customers/{id}` - Get customer by ID
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/customers/ref/{refNumber}` - Get by reference number
- `GET /api/customers/area/{area}` - Get by area

### Orders API (`/api/orders`)
- `GET /api/orders/admin/getAllOrders` - Get all orders
- `POST /api/orders/{customerRefNumber}` - Create new order
- `PUT /api/orders/{id}` - Update order
- `DELETE /api/orders/{id}` - Delete order
- `PUT /api/orders/{orderId}/deliver` - Mark order as delivered
- `PUT /api/orders/items/{itemId}/status/{status}` - Update item status

### Categories API (`/api/categories`)
- `GET /api/categories/Categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category
- `POST /api/categories/{categoryId}/subcategories` - Create subcategory

### Contacts API (`/api/contacts`)
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/{id}` - Get contact by ID
- `PUT /api/contacts/{id}` - Update contact
- `DELETE /api/contacts/{id}` - Delete contact

### Stock Movements API (`/api/stockMovements`)
- `GET /api/stockMovements` - Get all stock movements
- `GET /api/stockMovements/product/{productId}` - Get by product

## Integration Examples

### Using in ProductList.js
```javascript
import { useProducts } from '../hooks/useProducts';

export default function ProductList() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
  
  // Replace static data with real backend data
  // const [products, setProducts] = useState(staticProducts); // Remove this
  
  // Use the products from the hook instead
}
```

### Using in CustomersPage.js
```javascript
import { customerService } from '../services/apiIntegration';

export default function CustomersPage() {
  const [customersData, setCustomersData] = useState([]);
  
  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await customerService.fetchCustomers();
      setCustomersData(customers);
    };
    fetchCustomers();
  }, []);
}
```

### Using in AllOrders.js
```javascript
import { orderService } from '../services/apiIntegration';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await orderService.fetchOrders();
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);
}
```

## Setup Instructions

1. **Start Backend**: Run your Spring Boot application on port 8080
2. **Start Frontend**: Run `npm start` for React app on port 3000
3. **CORS**: Already configured for localhost:3000
4. **Database**: Ensure MySQL is running with inventory database

## API Service Usage

Import the API functions in your components:
```javascript
import { productAPI, customerAPI, orderAPI, categoryAPI, contactAPI } from '../api';
```

Or use the service layer:
```javascript
import { productService, customerService, orderService } from '../services/apiIntegration';
```

## Error Handling

All API calls include error handling. Check browser console for detailed error messages.

## Next Steps

1. Replace static data in your existing components with API calls
2. Add loading states to improve UX
3. Implement proper error handling in UI
4. Add form validation for create/update operations