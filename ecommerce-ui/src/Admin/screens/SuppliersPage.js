import '../css/SuppliersPage.css';
import '../css/Packages.css';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddSupplierForm from './AddSupplierForm';
import * as XLSX from 'xlsx';

export default function SuppliersPage() {
  const [suppliersData, setSuppliersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState('list');

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/suppliers');
      if (response.ok) {
        const data = await response.json();
        setSuppliersData(data);
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filteredData = suppliersData.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.includes(searchTerm)
  );
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleAddSupplier = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSupplierSubmit = async (formData) => {
    try {
      const supplierData = {
        name: formData.name,
        address: formData.address,
        email: formData.email,
        contact: formData.phone
      };

      const response = await fetch('http://localhost:8080/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData)
      });

      if (response.ok) {
        await fetchSuppliers();
        setCurrentPage(1);
        setShowModal(false);
        alert('Supplier added successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding supplier');
    }
  };

  const deleteSupplier = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/suppliers/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchSuppliers();
          alert('Supplier deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting supplier:', error);
      }
    }
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

      <div className="content-wrapper">
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading suppliers...</div>}
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
                        <button 
                          className="action-btn delete-btn" 
                          title="Delete"
                          onClick={() => deleteSupplier(supplier.id)}
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
              {currentData.map((supplier) => (
                <div key={supplier.id} className="package-card">
                  <div className="card-header">
                    <h3>{supplier.name}</h3>
                    <div className="card-actions">
                      <button className="action-btn edit-btn" title="Edit">
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        title="Delete"
                        onClick={() => deleteSupplier(supplier.id)}
                      >
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
