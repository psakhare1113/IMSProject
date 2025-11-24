import '../css/SuppliersPage.css';
import '../css/Packages.css';
import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddSupplierForm from './AddSupplierForm';
import * as XLSX from 'xlsx';

const initialSuppliersData = [
  {
    id: 1,
    name: 'XYZ Suppliers',
    address: '114 Test Address',
    email: 'xyz@suppliers.com',
    contact: '8545778888'
  },
  {
    id: 2,
    name: 'CAC Suppliers',
    address: '169 Atlace Avenue',
    email: 'business@cacsupn.com',
    contact: '7895451145'
  },
  {
    id: 3,
    name: 'CSTRO Suppliers',
    address: '114 Test Address',
    email: 'supplier@cstro.com',
    contact: '7149101910'
  },
  {
    id: 4,
    name: 'ABC Trading',
    address: '256 Commerce Street',
    email: 'info@abctrading.com',
    contact: '9876543210'
  },
  {
    id: 5,
    name: 'Global Supplies',
    address: '789 Industrial Park',
    email: 'contact@globalsupplies.com',
    contact: '8765432109'
  },
  {
    id: 6,
    name: 'Prime Vendors',
    address: '321 Business District',
    email: 'sales@primevendors.com',
    contact: '7654321098'
  },
  {
    id: 7,
    name: 'Metro Suppliers',
    address: '456 Metro Plaza',
    email: 'orders@metrosuppliers.com',
    contact: '6543210987'
  },
  {
    id: 8,
    name: 'Elite Trading Co',
    address: '654 Elite Tower',
    email: 'support@elitetrading.com',
    contact: '5432109876'
  },
  {
    id: 9,
    name: 'Swift Logistics',
    address: '987 Swift Center',
    email: 'info@swiftlogistics.com',
    contact: '4321098765'
  },
  {
    id: 10,
    name: 'Apex Suppliers',
    address: '147 Apex Building',
    email: 'contact@apexsuppliers.com',
    contact: '3210987654'
  }
];



export default function SuppliersPage() {
  const [suppliersData, setSuppliersData] = useState(initialSuppliersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState('list');
  const filteredData = suppliersData.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.includes(searchTerm)
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

  const handleAddSupplier = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSupplierSubmit = (formData) => {
    const newSupplier = {
      id: Math.max(...suppliersData.map(s => s.id)) + 1,
      name: formData.name,
      address: formData.address,
      email: formData.email,
      contact: formData.phone
    };
    setSuppliersData([newSupplier, ...suppliersData]);
    setCurrentPage(1);
    setShowModal(false);
    alert('Supplier added successfully!');
  };

  const exportToPDF = () => {
    const printContent = `
      <h2>Suppliers List Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Address</th><th>Email</th><th>Contact</th>
          </tr>
        </thead>
        <tbody>
          ${filteredData.map(supplier => `
            <tr>
              <td>${supplier.id}</td>
              <td>${supplier.name}</td>
              <td>${supplier.address}</td>
              <td>${supplier.email}</td>
              <td>${supplier.contact}</td>
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
    const supplierData = filteredData.map(supplier => ({
      'ID': supplier.id,
      'Name': supplier.name,
      'Address': supplier.address,
      'Email': supplier.email,
      'Contact': supplier.contact
    }));
    const worksheet = XLSX.utils.json_to_sheet(supplierData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Suppliers List');
    XLSX.writeFile(workbook, 'suppliers_list.xlsx');
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

  return (
    <div className="suppliers-container">
            <div className="page-title">
              <h2>List of Suppliers</h2>
            </div>

            {/* Filter Section */}
            <div className="content-wrapper">
              <div className="filter-section">
                <div className="search-container">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search suppliers..."
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
                  
                  <button className="add-packages-btn" onClick={handleAddSupplier}>+ Add Suppliers</button>
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
                      {currentData.map((supplier, index) => (
                        <tr key={supplier.id} className={index % 2 === 1 ? 'row-alternate' : ''}>
                          <td>{supplier.id}</td>
                          <td>{supplier.name}</td>
                          <td>{supplier.address}</td>
                          <td>{supplier.email}</td>
                          <td>{supplier.contact}</td>
                          <td style={{textAlign: 'right', paddingRight: '20px'}}>
                            <div className="action-buttons">
                              <button className="action-btn edit-btn" title="Edit">
                                <FaEdit />
                              </button>
                              <button className="action-btn delete-btn" title="Delete">
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
                    {currentData.map((supplier) => (
                      <div key={supplier.id} className="package-card">
                        <div className="card-header">
                          <h3>{supplier.name}</h3>
                          <div className="card-actions">
                            <button className="action-btn edit-btn" title="Edit">
                              <FaEdit />
                            </button>
                            <button className="action-btn delete-btn" title="Delete">
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <p><strong>ID:</strong> {supplier.id}</p>
                          <p><strong>Address:</strong> {supplier.address}</p>
                          <p><strong>Email:</strong> {supplier.email}</p>
                          <p><strong>Contact:</strong> {supplier.contact}</p>
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

            {/* Import Section */}
            <div className="import-section">
              <h3>Import Suppliers Data</h3>
              <div className="import-controls">
                <div className="file-input-group">
                  <label htmlFor="file-input">Input File</label>
                  <div className="file-input-wrapper">
                    <input 
                      type="file" 
                      id="file-input" 
                      className="file-input" 
                      onChange={handleFileChange}
                      accept=".csv,.xlsx,.xls"
                    />
                    <span className="file-input-text">Choose File | No file chosen</span>
                  </div>
                </div>
                <button className="btn btn-import" onClick={handleImport}>Import</button>
              </div>
            </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <AddSupplierForm onClose={handleCloseModal} onSubmit={handleSupplierSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}