import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddProductModal from './AddProductModal';
import * as XLSX from 'xlsx';
import '../css/SuppliersPage.css';
import '../css/Packages.css';
import '../css/AdminModal.css';



export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    sku: "",
    status: "ACTIVE",
    weightLbs: "",
    weightOz: ""
  });

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchProducts(); // Refresh from database
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
      sku: "",
      status: "ACTIVE",
      weightLbs: "",
      weightOz: ""
    });
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      categoryId: product.category?.id || "",
      sku: product.sku || "",
      status: product.status,
      weightLbs: product.weightLbs?.toString() || "",
      weightOz: product.weightOz?.toString() || ""
    });
    setShowForm(true);
  };

  // Fetch products from database
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/products');
      if (response.ok) {
        const dbProducts = await response.json();
        // Convert backend format to UI format
        const uiProducts = dbProducts.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.availableQuantity,
          imageUrl: product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
          status: product.status || "ACTIVE",
          category: { 
            id: product.selectedCategoryId, 
            name: product.selectedCategoryName || "No Category" 
          }
        }));
        setProducts(uiProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        availableQuantity: parseInt(formData.quantity) || 0,
        sku: formData.sku || `SKU-${Date.now()}`,
        status: formData.status || 'ACTIVE',
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
        subCategoryId: null // You can add subcategory logic later if needed
      };

      if (editingProduct) {
        const response = await fetch(`http://localhost:8080/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        
        if (response.ok) {
          await fetchProducts(); // Refresh from database
        }
      } else {
        const response = await fetch('http://localhost:8080/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        
        if (response.ok) {
          await fetchProducts(); // Refresh from database
        }
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving product');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const exportToPDF = () => {
    const printContent = `
      <h2>Products List Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Quantity</th><th>Category</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${filteredProducts.map(product => `
            <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.description}</td>
              <td>₹${product.price}</td>
              <td>${product.quantity}</td>
              <td>${product.category ? product.category.name : 'No Category'}</td>
              <td>${product.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const productData = filteredProducts.map(product => ({
      'ID': product.id,
      'Name': product.name,
      'Description': product.description,
      'Price': product.price,
      'Quantity': product.quantity,
      'Category': product.category ? product.category.name : 'No Category',
      'Status': product.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(productData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products List');
    XLSX.writeFile(workbook, 'products_list.xlsx');
  };

  return (
    <div className="admin suppliers-container">
      <div className="page-title">
        <h2>Product List</h2>
      </div>

      <div className="content-wrapper">
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading products...</div>}
        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="filter-right">
            <div className="view-icons-top">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <GridViewIcon fontSize="medium" />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <ViewListIcon fontSize="medium" />
              </button>
            </div>
            
            <div className="show-entries">
              <span>Show </span>
              <select 
                className="entries-select" 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span> entries</span>
            </div>
            
            <div className="status-container">
              <span className="status-label">Status</span>
              <select
                className="status-dropdown"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="DISCONTINUED">Discontinued</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
            
            <button className="add-packages-btn" onClick={handleAdd}>+ Add Product</button>
            <button className="btn btn-pdf" onClick={exportToPDF}>📄 Export PDF</button>
            <button className="btn btn-excel" onClick={exportToExcel}>📊 Export Excel</button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="packages-table-container">
            <table className="packages-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th style={{textAlign: 'right', paddingRight: '20px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 1 ? 'row-alternate' : ''}>
                    <td>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category ? product.category.name : 'No Category'}</td>
                    <td>
                      <span className={`status-badge ${
                        product.status === 'ACTIVE' ? 'status-active' :
                        product.status === 'INACTIVE' ? 'status-inactive' :
                        product.status === 'DISCONTINUED' ? 'status-discontinued' : 'status-out-of-stock'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{textAlign: 'right', paddingRight: '20px'}}>
                      <div className="action-buttons">
                        <button className="action-btn edit-btn" onClick={() => handleEdit(product)} title="Edit">
                          <FaEdit />
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          onClick={() => deleteProduct(product.id)}
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid-wrapper">
            <div className="packages-grid">
              {currentProducts.map((product) => (
                <div key={product.id} className="package-card">
                  <div className="card-header">
                    <h3>{product.name}</h3>
                    <div className="card-actions">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(product)} title="Edit">
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        onClick={() => deleteProduct(product.id)}
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '15px', borderRadius: '4px' }}
                    />
                    <p><strong>ID:</strong> {product.id}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Category:</strong> {product.category ? product.category.name : 'No Category'}</p>
                    <p><strong>Status:</strong> 
                      <span className={`status-badge ${
                        product.status === 'ACTIVE' ? 'status-active' :
                        product.status === 'INACTIVE' ? 'status-inactive' :
                        product.status === 'DISCONTINUED' ? 'status-discontinued' : 'status-out-of-stock'
                      }`}>
                        {product.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pagination">
        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page}
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>

      {/* Add Product Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            <AddProductModal 
              onClose={() => setShowForm(false)} 
              onSubmit={handleFormSubmit}
              editingProduct={editingProduct}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      )}
    </div>
  );
}