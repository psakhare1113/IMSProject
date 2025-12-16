  // Example integration for your existing UI components
import { productAPI, customerAPI, orderAPI, categoryAPI, contactAPI } from '../api';

// Product Management Integration
export const productService = {
  // For ProductList.js component
  async fetchProducts() {
    try {
      const response = await productAPI.getAll();
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async createProduct(productData) {
    try {
      const response = await productAPI.create(productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await productAPI.update(id, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      await productAPI.delete(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async searchProducts(query) {
    try {
      const response = await productAPI.search(query);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};

// Customer Management Integration
export const customerService = {
  // For CustomersPage.js component
  async fetchCustomers() {
    try {
      const response = await customerAPI.getAll();
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  },

  async createCustomer(customerData) {
    try {
      const response = await customerAPI.create(customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }
};

// Order Management Integration
export const orderService = {
  // For AllOrders.js component
  async fetchOrders() {
    try {
      const response = await orderAPI.getAll();
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  async createOrder(customerRefNumber, orderData) {
    try {
      const response = await orderAPI.create(customerRefNumber, orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};

// Contact Management Integration
export const contactService = {
  // For Contacts.js component
  async fetchContacts() {
    try {
      const response = await contactAPI.getAll();
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  },

  async createContact(contactData) {
    try {
      const response = await contactAPI.create(contactData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }
};

// Category Management Integration
export const categoryService = {
  // For CategoryList.js component
  async fetchCategories() {
    try {
      const response = await categoryAPI.getAll();
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async createCategory(categoryData) {
    try {
      const response = await categoryAPI.create(categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }
};