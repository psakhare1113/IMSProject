// Mock data storage
let categories = [
  { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
  { id: 2, name: 'Furniture', description: 'Home and office furniture' },
  { id: 3, name: 'Clothing', description: 'Apparel and accessories' }
];

let products = [
  {
    id: 1,
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    quantity: 25,
    categoryId: 1,
    status: 'ACTIVE',
    imageUrl: 'https://via.placeholder.com/50'
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 29.99,
    quantity: 100,
    categoryId: 1,
    status: 'ACTIVE',
    imageUrl: 'https://via.placeholder.com/50'
  },
  {
    id: 3,
    name: 'Gaming Keyboard',
    description: 'Mechanical gaming keyboard with RGB lighting',
    price: 89.99,
    quantity: 0,
    categoryId: 1,
    status: 'OUT_OF_STOCK',
    imageUrl: null
  },
  {
    id: 4,
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    price: 199.99,
    quantity: 15,
    categoryId: 2,
    status: 'ACTIVE',
    imageUrl: 'https://via.placeholder.com/50'
  }
];

// Category API
export const categoryAPI = {
  getAll: () => Promise.resolve({ data: categories }),
  getById: (id) => {
    const category = categories.find(c => c.id === parseInt(id));
    return category ? Promise.resolve({ data: category }) : Promise.reject(new Error('Category not found'));
  },
  create: (data) => {
    const newCategory = { ...data, id: Math.max(...categories.map(c => c.id)) + 1 };
    categories.push(newCategory);
    return Promise.resolve({ data: newCategory });
  },
  update: (id, data) => {
    const index = categories.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      categories[index] = { ...categories[index], ...data };
      return Promise.resolve({ data: categories[index] });
    }
    return Promise.reject(new Error('Category not found'));
  },
  delete: (id) => {
    const index = categories.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      categories.splice(index, 1);
      return Promise.resolve({ data: { message: 'Category deleted' } });
    }
    return Promise.reject(new Error('Category not found'));
  }
};

// Product API
export const productAPI = {
  getAll: () => {
    const productsWithCategories = products.map(product => ({
      ...product,
      category: categories.find(c => c.id === product.categoryId) || null
    }));
    return Promise.resolve({ data: productsWithCategories });
  },
  getById: (id) => {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      const productWithCategory = {
        ...product,
        category: categories.find(c => c.id === product.categoryId) || null
      };
      return Promise.resolve({ data: productWithCategory });
    }
    return Promise.reject(new Error('Product not found'));
  },
  create: (data) => {
    const newProduct = { ...data, id: Math.max(...products.map(p => p.id)) + 1 };
    products.push(newProduct);
    const productWithCategory = {
      ...newProduct,
      category: categories.find(c => c.id === newProduct.categoryId) || null
    };
    return Promise.resolve({ data: productWithCategory });
  },
  update: (id, data) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      const productWithCategory = {
        ...products[index],
        category: categories.find(c => c.id === products[index].categoryId) || null
      };
      return Promise.resolve({ data: productWithCategory });
    }
    return Promise.reject(new Error('Product not found'));
  },
  delete: (id) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      products.splice(index, 1);
      return Promise.resolve({ data: { message: 'Product deleted' } });
    }
    return Promise.reject(new Error('Product not found'));
  }
};