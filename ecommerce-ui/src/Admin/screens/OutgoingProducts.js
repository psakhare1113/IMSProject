import React, { useState, useMemo } from "react";
import * as XLSX from 'xlsx';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import '../css/SuppliersPage.css';
import '../css/Packages.css';
import AddOutgoingProductModal from './AddOutgoingProductModal';

const initialOutgoingProducts = [
  { id: 1, productName: "Acer Predator Triton 500", customer: "John Graham", quantity: 2, unitPrice: 1299.99, totalPrice: 2599.98, date: "2024-01-25", status: "shipped" },
  { id: 2, productName: "iPhone 13 Pro", customer: "Alice Johnson", quantity: 1, unitPrice: 999.99, totalPrice: 999.99, date: "2024-01-24", status: "pending" },
  { id: 3, productName: "Dell XPS 13", customer: "Bob Smith", quantity: 3, unitPrice: 1199.99, totalPrice: 3599.97, date: "2024-01-23", status: "delivered" },
  { id: 4, productName: "Samsung Galaxy S22", customer: "Christine Moore", quantity: 1, unitPrice: 799.99, totalPrice: 799.99, date: "2024-01-22", status: "cancelled" },
  { id: 5, productName: "MacBook Pro M2", customer: "David Wilson", quantity: 1, unitPrice: 2499.99, totalPrice: 2499.99, date: "2024-01-21", status: "shipped" },
  { id: 6, productName: "iPad Air", customer: "Sarah Davis", quantity: 2, unitPrice: 599.99, totalPrice: 1199.98, date: "2024-01-20", status: "pending" },
  { id: 7, productName: "Sony WH-1000XM4", customer: "Mike Brown", quantity: 1, unitPrice: 349.99, totalPrice: 349.99, date: "2024-01-19", status: "delivered" },
  { id: 8, productName: "Nintendo Switch", customer: "Emma Taylor", quantity: 1, unitPrice: 299.99, totalPrice: 299.99, date: "2024-01-18", status: "shipped" },
  { id: 9, productName: "LG OLED TV 55", customer: "James Anderson", quantity: 1, unitPrice: 1799.99, totalPrice: 1799.99, date: "2024-01-17", status: "pending" },
  { id: 10, productName: "Canon EOS R5", customer: "Lisa Martinez", quantity: 1, unitPrice: 3899.99, totalPrice: 3899.99, date: "2024-01-16", status: "delivered" }
];

const OutgoingProducts = () => {
  const [outgoingProducts, setOutgoingProducts] = useState(initialOutgoingProducts);
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

  const [isTransitioning, setIsTransitioning] = useState(false);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filtered.slice(startIndex, startIndex + entriesPerPage);
  }, [filtered, currentPage, entriesPerPage]);

  const totalPages = Math.ceil(filtered.length / entriesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        setIsTransitioning(false);
      }, 150);
    }
  };

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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this outgoing product?")) {
      setOutgoingProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      totalPrice: parseInt(formData.quantity) * parseFloat(formData.unitPrice)
    };

    if (editingProduct) {
      setOutgoingProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      const newProduct = {
        id: Math.max(...outgoingProducts.map(p => p.id)) + 1,
        ...productData,
        status: "pending"
      };
      setOutgoingProducts(prev => {
        const updatedProducts = [...prev, newProduct];
        const newTotalPages = Math.ceil(updatedProducts.length / entriesPerPage);
        
        // Navigate to the page containing the new product
        setTimeout(() => {
          setCurrentPage(newTotalPages);
        }, 100);
        
        return updatedProducts;
      });
    }
    setShowModal(false);
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

      {/* Filter Section */}
      <div className="content-wrapper">
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
                      <div className="action-buttons" style={{alignItems: 'flex-start', gap: '8px'}}>
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

      {/* Pagination */}
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

      {/* Export Invoice Section */}
      <div className="import-section">
        <h3>Export Invoice</h3>
        <div className="table-container">
          <table className="suppliers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Products</th>
                <th>Customer</th>
                <th>Qty.</th>
                <th>Date</th>
                <th>Action</th>
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
                  <td>
                    <button
                      className="btn btn-import"
                      onClick={() => exportInvoice(product)}
                    >
                      Export Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
      {/* Modal */}
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