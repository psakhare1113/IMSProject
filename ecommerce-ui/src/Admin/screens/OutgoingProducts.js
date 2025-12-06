import React, { useState, useMemo, useEffect } from "react";
import * as XLSX from 'xlsx';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import '../css/SuppliersPage.css';
import '../css/Packages.css';
import AddOutgoingProductModal from './AddOutgoingProductModal';

const OutgoingProducts = () => {
  const [outgoingProducts, setOutgoingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [formData, setFormData] = useState({
    productName: "",
    customer: "",
    quantity: "",
    unitPrice: "",
    date: ""
  });

  const fetchOutgoingProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/outgoing-products');
      if (response.ok) {
        const data = await response.json();
        setOutgoingProducts(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutgoingProducts();
  }, []);

  const filtered = useMemo(() => {
    let result = outgoingProducts;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(product => 
        product.productName.toLowerCase().includes(q) ||
        product.customer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [outgoingProducts, search]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filtered.slice(startIndex, startIndex + entriesPerPage);
  }, [filtered, currentPage, entriesPerPage]);

  const totalPages = Math.ceil(filtered.length / entriesPerPage);

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ productName: "", customer: "", quantity: "", unitPrice: "", date: "" });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      customer: product.customer,
      quantity: product.quantity.toString(),
      unitPrice: product.unitPrice.toString(),
      date: product.date
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this outgoing product?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/outgoing-products/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchOutgoingProducts();
          alert('Outgoing product deleted successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        productName: formData.productName,
        customer: formData.customer,
        quantity: parseInt(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice),
        date: formData.date
      };

      if (editingProduct) {
        const response = await fetch(`http://localhost:8080/api/outgoing-products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (response.ok) {
          await fetchOutgoingProducts();
          setShowModal(false);
          alert('Outgoing product updated successfully!');
        }
      } else {
        const response = await fetch('http://localhost:8080/api/outgoing-products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (response.ok) {
          await fetchOutgoingProducts();
          setShowModal(false);
          alert('Outgoing product added successfully!');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const exportToPDF = () => {
    const printContent = `
      <h2>Outgoing List Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>ID</th><th>Products</th><th>Customer</th><th>Qty.</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(product => `
            <tr>
              <td>${product.id}</td>
              <td>${product.productName}</td>
              <td>${product.customer}</td>
              <td>${product.quantity}</td>
              <td>${product.date}</td>
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
    const productData = filtered.map(product => ({
      'ID': product.id,
      'Products': product.productName,
      'Customer': product.customer,
      'Qty.': product.quantity,
      'Date': product.date
    }));
    const worksheet = XLSX.utils.json_to_sheet(productData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Outgoing List');
    XLSX.writeFile(workbook, 'outgoing_list.xlsx');
  };

  const exportInvoice = (product) => {
    const invoiceContent = `
      <h2>Invoice</h2>
      <p><strong>Product:</strong> ${product.productName}</p>
      <p><strong>Customer:</strong> ${product.customer}</p>
      <p><strong>Quantity:</strong> ${product.quantity}</p>
      <p><strong>Date:</strong> ${product.date}</p>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="suppliers-container">
      <div className="page-title">
        <h2>Outgoing List</h2>
      </div>

      <div className="content-wrapper">
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading products...</div>}
        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search products or customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span> entries</span>
            </div>
            
            <button className="add-packages-btn" onClick={handleAdd}>+ Add New Outgoing Product</button>
            <button className="btn btn-pdf" onClick={exportToPDF}>📄 Export PDF</button>
            <button className="btn btn-excel" onClick={exportToExcel}>📊 Export Excel</button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="packages-table-container">
            <table className="packages-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Products</th>
                  <th>Customer</th>
                  <th>Qty.</th>
                  <th>Date</th>
                  <th style={{textAlign: 'right', paddingRight: '20px'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 1 ? 'row-alternate' : ''}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.customer}</td>
                    <td>{product.quantity}</td>
                    <td>{product.date}</td>
                    <td style={{textAlign: 'right', paddingRight: '20px'}}>
                      <div className="action-buttons">
                        <button className="action-btn edit-btn" onClick={() => handleEdit(product)} title="Edit">
                          <FaEdit />
                        </button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(product.id)} title="Delete">
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
              {paginatedData.map((product) => (
                <div key={product.id} className="package-card">
                  <div className="card-header">
                    <h3>{product.productName}</h3>
                    <div className="card-actions">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(product)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(product.id)} title="Delete">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p><strong>ID:</strong> {product.id}</p>
                    <p><strong>Customer:</strong> {product.customer}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Date:</strong> {product.date}</p>
                    <p><strong>Price:</strong> ${product.unitPrice}</p>
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <AddOutgoingProductModal 
              onClose={() => setShowModal(false)} 
              onSubmit={handleSubmit}
              editingProduct={editingProduct}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OutgoingProducts;
