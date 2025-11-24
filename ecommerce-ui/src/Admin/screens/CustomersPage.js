import '../css/SuppliersPage.css';
import '../css/Packages.css';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCustomerForm from './AddCustomerForm';



export default function CustomersPage() {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState('list');
  const filteredData = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.includes(searchTerm)
  );
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddCustomer = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Fetch customers from database
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/customers');
      if (response.ok) {
        const customers = await response.json();
        // Convert backend format to UI format
        const uiCustomers = customers.map(customer => ({
          id: customer.id,
          name: customer.name,
          address: customer.shippingDetails?.address1 || 'N/A',
          email: customer.email || 'N/A',
          contact: customer.phoneNumber
        }));
        setCustomersData(uiCustomers);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCustomerSubmit = async (formData) => {
    try {
      const customerData = {
        customerRefNumber: `CUST-${Date.now()}`,
        name: formData.name,
        phoneNumber: formData.contact,
        shippingDetails: {
          address1: formData.address,
          address2: "",
          area: "Default Area"
        },
        paymentDetails: {
          paymentType: "CASH",
          maskedCardNumber: "",
          transactionReference: ""
        }
      };

      const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      });

      if (response.ok) {
        const newCustomer = await response.json();
        // Convert backend format to UI format
        const uiCustomer = {
          id: newCustomer.id,
          name: newCustomer.name,
          address: newCustomer.shippingDetails?.address1 || '',
          email: formData.email,
          contact: newCustomer.phoneNumber
        };
        // Refresh the customer list from database
        await fetchCustomers();
        setCurrentPage(1);
        setShowModal(false);
        alert('Customer added successfully!');
      } else {
        alert('Failed to add customer');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding customer');
    }
  };

  const exportToPDF = () => {
    const printContent = `
      <h2>Customers List Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Address</th><th>Email</th><th>Contact</th>
          </tr>
        </thead>
        <tbody>
          ${filteredData.map(customer => `
            <tr>
              <td>${customer.id}</td>
              <td>${customer.name}</td>
              <td>${customer.address}</td>
              <td>${customer.email}</td>
              <td>${customer.contact}</td>
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
    const customerData = filteredData.map(customer => ({
      'ID': customer.id,
      'Name': customer.name,
      'Address': customer.address,
      'Email': customer.email,
      'Contact': customer.contact
    }));
    const worksheet = XLSX.utils.json_to_sheet(customerData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers List');
    XLSX.writeFile(workbook, 'customers_list.xlsx');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const fileText = document.querySelector('.file-input-text');
    if (file) {
      fileText.textContent = `${file.name} | File selected`;
    } else {
      fileText.textContent = 'Choose File | No file chosen';
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      console.log('Importing file:', selectedFile.name);
      alert(`File "${selectedFile.name}" imported successfully!`);
      setSelectedFile(null);
      document.querySelector('.file-input-text').textContent = 'Choose File | No file chosen';
      document.getElementById('file-input').value = '';
    } else {
      alert('Please select a file to import');
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setCustomersData(prev => prev.filter(customer => customer.id !== id));
          alert('Customer deleted successfully!');
        } else {
          alert('Failed to delete customer');
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Error deleting customer');
      }
    }
  };

  return (
    <div className="suppliers-container">
            <div className="page-title">
              <h2>List of Customers</h2>
            </div>

            {/* Filter Section */}
            <div className="content-wrapper">
              {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading customers...</div>}
              <div className="filter-section">
                <div className="search-container">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search customers..."
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
                  
                  <button className="add-packages-btn" onClick={handleAddCustomer}>+ Add Customer</button>
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
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th style={{textAlign: 'right', paddingRight: '20px'}}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((customer, index) => (
                        <tr key={customer.id} className={index % 2 === 1 ? 'row-alternate' : ''}>
                          <td>{customer.id}</td>
                          <td>{customer.name}</td>
                          <td>{customer.address}</td>
                          <td>{customer.email}</td>
                          <td>{customer.contact}</td>
                          <td style={{textAlign: 'right', paddingRight: '20px'}}>
                            <div className="action-buttons">
                              <button className="action-btn edit-btn" title="Edit">
                                <FaEdit />
                              </button>
                              <button 
                                className="action-btn delete-btn" 
                                title="Delete"
                                onClick={() => deleteCustomer(customer.id)}
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
                    {currentData.map((customer) => (
                      <div key={customer.id} className="package-card">
                        <div className="card-header">
                          <h3>{customer.name}</h3>
                          <div className="card-actions">
                            <button className="action-btn edit-btn" title="Edit">
                              <FaEdit />
                            </button>
                            <button 
                              className="action-btn delete-btn" 
                              title="Delete"
                              onClick={() => deleteCustomer(customer.id)}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <p><strong>ID:</strong> {customer.id}</p>
                          <p><strong>Address:</strong> {customer.address}</p>
                          <p><strong>Email:</strong> {customer.email}</p>
                          <p><strong>Contact:</strong> {customer.contact}</p>
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


      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <AddCustomerForm onClose={handleCloseModal} onSubmit={handleCustomerSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}