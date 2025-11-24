import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
  search: (query) => api.get(`/products/search?query=${query}`),
  getByStatus: (status) => api.get(`/products/status/${status}`),
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
};

// Customer API
export const customerAPI = {
  getAll: () => api.get('/customers'),
  create: (customerData) => api.post('/customers', customerData),
  getById: (id) => api.get(`/customers/${id}`),
  update: (id, customerData) => api.put(`/customers/${id}`, customerData),
  delete: (id) => api.delete(`/customers/${id}`),
  getByRefNumber: (refNumber) => api.get(`/customers/ref/${refNumber}`),
  getByArea: (area) => api.get(`/customers/area/${area}`),
  getCountByArea: (area) => api.get(`/customers/area/${area}/count`),
};

// Order API
export const orderAPI = {
  getAll: () => api.get('/orders/admin/getAllOrders'),
  create: (customerRefNumber, orderData) => api.post(`/orders/${customerRefNumber}`, orderData),
  update: (id, orderData) => api.put(`/orders/${id}`, orderData),
  delete: (id) => api.delete(`/orders/${id}`),
  getByCustomer: (customerRefNumber) => api.get(`/orders/${customerRefNumber}`),
  getByStatus: (customerRefNumber, status) => api.get(`/orders/${customerRefNumber}/status/${status}`),
  getByDateRange: (startDate, endDate) => api.get(`/orders/filter/dateRange?startDate=${startDate}&endDate=${endDate}`),
  getAllOrderItems: () => api.get('/orders/items'),
  returnItem: (itemId, returnQuantity = 1) => api.post(`/orders/items/${itemId}/return?returnQuantity=${returnQuantity}`),
  deliverOrder: (orderId) => api.put(`/orders/${orderId}/deliver`),
  updateItemStatus: (itemId, status) => api.put(`/orders/items/${itemId}/status/${status}`),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories/Categories'),
  create: (categoryData) => api.post('/categories', categoryData),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
  createSubCategory: (categoryId, subCategoryData) => api.post(`/categories/${categoryId}/subcategories`, subCategoryData),
  getSubCategories: (categoryId) => api.get(`/categories/${categoryId}/subcategories`),
};

// Contact API
export const contactAPI = {
  getAll: () => api.get('/contacts'),
  getById: (id) => api.get(`/contacts/${id}`),
  create: (contactData) => api.post('/contacts', contactData),
  update: (id, contactData) => api.put(`/contacts/${id}`, contactData),
  delete: (id) => api.delete(`/contacts/${id}`),
  getByStatus: (status) => api.get(`/contacts/status/${status}`),
};

// Stock Movement API
export const stockMovementAPI = {
  getAll: () => api.get('/stockMovements'),
  getByProduct: (productId) => api.get(`/stockMovements/product/${productId}`),
};

export default api;