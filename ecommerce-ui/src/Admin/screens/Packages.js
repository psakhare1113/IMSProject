import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaEdit, FaCloudDownloadAlt, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddPackageForm from './AddPackageForm';
import "../css/SuppliersPage.css";
import "../css/Packages.css";
import "../css/AdminModal.css";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPackage, setEditingPackage] = useState(null);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    customerName: "",
    date: "",
    status: ""
  });

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/packages');
      if (response.ok) {
        const data = await response.json();
        setPackages(data.map(pkg => ({
          ...pkg,
          customer: pkg.customerName
        })));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const packageData = {
        customerName: formData.customerName,
        date: formData.date,
        status: formData.status
      };

      if (editingPackage) {
        await fetch(`http://localhost:8080/api/packages/${editingPackage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(packageData)
        });
        alert('Package updated successfully!');
      } else {
        await fetch('http://localhost:8080/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(packageData)
        });
        alert('Package added successfully!');
      }
      await fetchPackages();
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const deletePackage = async (id) => {
    if (window.confirm('Delete this package?')) {
      try {
        await fetch(`http://localhost:8080/api/packages/${id}`, {
          method: 'DELETE'
        });
        alert('Package deleted successfully!');
        await fetchPackages();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
    }
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setFormData({
      customerName: "",
      date: "",
      status: ""
    });
    setShowForm(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      customerName: pkg.customer || pkg.customerName,
      date: pkg.date,
      status: pkg.status || ""
    });
    setShowForm(true);
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = (pkg.customer || pkg.customerName || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="admin packages-container">
      <div className="content-wrapper">
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading packages...</div>}
        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
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
            
            <div className="status-container">
              <span className="status-label">Status</span>
              <select
                className="status-dropdown"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Not shipped">Not shipped</option>
              </select>
            </div>

            <button className="add-packages-btn" onClick={handleAdd}>+ Add Package</button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="packages-table-container">
            <table className="packages-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPackages.map((pkg) => (
                  <tr key={pkg.id} className="table-row">
                    <td className="package-id">{pkg.id}</td>
                    <td>{pkg.date}</td>
                    <td className="package-name">{pkg.customer || pkg.customerName}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          pkg.status === "Delivered"
                            ? "delivered"
                            : pkg.status === "Shipped"
                            ? "shipped"
                            : "not-shipped"
                        }`}
                      >
                        {pkg.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit-btn" onClick={() => handleEdit(pkg)} title="Edit">
                          <FaEdit />
                        </button>
                        <button className="action-btn delete-btn" onClick={() => deletePackage(pkg.id)} title="Delete">
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
              {currentPackages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <div className="card-header">
                    <h3>{pkg.customer || pkg.customerName}</h3>
                    <div className="card-actions">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(pkg)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="action-btn delete-btn" onClick={() => deletePackage(pkg.id)} title="Delete">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p><strong>ID:</strong> {pkg.id}</p>
                    <p><strong>Date:</strong> {pkg.date}</p>
                    <p><strong>Status:</strong> 
                      <span className={`status-badge ${
                        pkg.status === "Delivered"
                          ? "delivered"
                          : pkg.status === "Shipped"
                          ? "shipped"
                          : "not-shipped"
                      }`}>
                        {pkg.status}
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

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            <AddPackageForm 
              onClose={() => setShowForm(false)} 
              onSubmit={handleFormSubmit}
              editingPackage={editingPackage}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
