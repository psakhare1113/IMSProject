import '../css/SuppliersPage.css';
import '../css/Packages.css';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddInvoiceForm from './AddInvoiceForm';
import * as XLSX from 'xlsx';

export default function Invoices() {
  const [invoicesData, setInvoicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    customerName: '',
    amount: '',
    tax: '',
    dueDate: '',
    status: ''
  });

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/invoices');
      if (response.ok) {
        const data = await response.json();
        setInvoicesData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredData = invoicesData.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleAddInvoice = () => {
    setEditingInvoice(null);
    setFormData({
      invoiceNumber: '',
      customerName: '',
      amount: '',
      tax: '',
      dueDate: '',
      status: ''
    });
    setShowModal(true);
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      invoiceNumber: invoice.invoiceNumber,
      customerName: invoice.customerName,
      amount: invoice.amount.toString(),
      tax: invoice.tax?.toString() || '',
      dueDate: invoice.dueDate,
      status: invoice.status
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const invoiceData = {
        invoiceNumber: formData.invoiceNumber,
        customerName: formData.customerName,
        amount: parseFloat(formData.amount),
        tax: parseFloat(formData.tax) || 0,
        dueDate: formData.dueDate,
        status: formData.status
      };

      if (editingInvoice) {
        await fetch(`http://localhost:8080/api/invoices/${editingInvoice.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoiceData)
        });
        alert('Invoice updated successfully!');
      } else {
        await fetch('http://localhost:8080/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoiceData)
        });
        alert('Invoice added successfully!');
      }
      await fetchInvoices();
      setShowModal(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const deleteInvoice = async (id) => {
    if (window.confirm('Delete this invoice?')) {
      try {
        await fetch(`http://localhost:8080/api/invoices/${id}`, {
          method: 'DELETE'
        });
        alert('Invoice deleted successfully!');
        await fetchInvoices();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
    }
  };

  const exportToPDF = () => {
    const printContent = `
      <h2>Invoices List Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Invoice #</th><th>Customer Name</th><th>Amount</th><th>Tax</th><th>Due Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${filteredData.map(invoice => `
            <tr>
              <td>${invoice.invoiceNumber}</td>
              <td>${invoice.customerName}</td>
              <td>₹${invoice.amount.toFixed(2)}</td>
              <td>₹${invoice.tax.toFixed(2)}</td>
              <td>${invoice.dueDate}</td>
              <td>${invoice.status}</td>
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
    const invoiceData = filteredData.map(invoice => ({
      'Invoice Number': invoice.invoiceNumber,
      'Customer Name': invoice.customerName,
      'Amount': invoice.amount,
      'Tax': invoice.tax,
      'Due Date': invoice.dueDate,
      'Status': invoice.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(invoiceData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices List');
    XLSX.writeFile(workbook, 'invoices_list.xlsx');
  };

  return (
    <div className="suppliers-container">
      <div className="page-title">
        <h2>List of Invoices</h2>
      </div>

      <div className="content-wrapper">
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading invoices...</div>}
        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
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
            
            <button className="add-packages-btn" onClick={handleAddInvoice}>+ Add Invoice</button>
            <button className="btn btn-pdf" onClick={exportToPDF}>📄 Export PDF</button>
            <button className="btn btn-excel" onClick={exportToExcel}>📊 Export Excel</button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="packages-table-container">
            <table className="packages-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Customer Name</th>
                  <th>Amount</th>
                  <th>Tax</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th style={{textAlign: 'right', paddingRight: '20px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((invoice, index) => (
                  <tr key={invoice.id} className={index % 2 === 1 ? 'row-alternate' : ''}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.customerName}</td>
                    <td>${invoice.amount.toFixed(2)}</td>
                    <td>${invoice.tax.toFixed(2)}</td>
                    <td>{invoice.dueDate}</td>
                    <td>
                      <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td style={{textAlign: 'right', paddingRight: '20px'}}>
                      <div className="action-buttons">
                        <button className="action-btn edit-btn" onClick={() => handleEdit(invoice)} title="Edit">
                          <FaEdit />
                        </button>
                        <button className="action-btn delete-btn" onClick={() => deleteInvoice(invoice.id)} title="Delete">
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
              {currentData.map((invoice) => (
                <div key={invoice.id} className="package-card">
                  <div className="card-header">
                    <h3>{invoice.invoiceNumber}</h3>
                    <div className="card-actions">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(invoice)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="action-btn delete-btn" onClick={() => deleteInvoice(invoice.id)} title="Delete">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p><strong>Customer:</strong> {invoice.customerName}</p>
                    <p><strong>Amount:</strong> ${invoice.amount.toFixed(2)}</p>
                    <p><strong>Tax:</strong> ${invoice.tax.toFixed(2)}</p>
                    <p><strong>Due Date:</strong> {invoice.dueDate}</p>
                    <p><strong>Status:</strong> 
                      <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                        {invoice.status}
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

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <AddInvoiceForm 
              onClose={handleCloseModal} 
              onSubmit={handleInvoiceSubmit}
              editingInvoice={editingInvoice}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
