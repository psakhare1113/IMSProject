import React, { useState, useEffect } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import "../css/Shipping.css";

const tabs = ["Shipping", "Marketplace", "Payments", "Accounting", "CRM"];

export default function Shipping() {
  const [activeTab, setActiveTab] = useState("Shipping");
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [newCarrier, setNewCarrier] = useState({ name: '', logo: '' });
  const [logoFile, setLogoFile] = useState(null);
  const [carriersList, setCarriersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCarriers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/shipping-carriers');
      if (response.ok) {
        const data = await response.json();
        setCarriersList(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarriers();
  }, []);

  const totalPages = Math.ceil(carriersList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = carriersList.slice(startIndex, startIndex + itemsPerPage);

  const handleAddCarrier = () => {
    setNewCarrier({ name: '', logo: '' });
    setLogoFile(null);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCarrier({...newCarrier, logo: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newCarrier.name && newCarrier.logo) {
        const response = await fetch('http://localhost:8080/api/shipping-carriers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCarrier)
        });
        
        if (response.ok) {
          alert('Shipping carrier added successfully!');
          await fetchCarriers();
          setNewCarrier({ name: '', logo: '' });
          setShowModal(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const deleteCarrier = async (id) => {
    if (window.confirm('Delete this carrier?')) {
      try {
        await fetch(`http://localhost:8080/api/shipping-carriers/${id}`, {
          method: 'DELETE'
        });
        alert('Shipping carrier deleted successfully!');
        await fetchCarriers();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="integrations-container">
      <div className="content-wrapper">
        <div className="integrations-header">
          <h2>Integrations</h2>
        </div>
        
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading carriers...</div>}
        
        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search integrations..."
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
            
            <button className="add-packages-btn" onClick={handleAddCarrier}>
              + Add Shipping
            </button>
          </div>
        </div>

        <div className="tabs-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {viewMode === 'grid' ? (
          <div className="integration-grid">
            {currentData.map((item) => (
              <div className="integration-card" key={item.id}>
                <div className="card-header">
                  <span className="star">★</span>
                  <span className="menu" onClick={() => deleteCarrier(item.id)} style={{cursor: 'pointer'}}>×</span>
                </div>
                <img src={item.logo} alt={item.name} className="integration-logo" />
                <h3>{item.name}</h3>
                <button className="setup-btn">Setup Now</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="integration-list">
            <table className="list-table">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id}>
                    <td><img src={item.logo} alt={item.name} className="list-logo" /></td>
                    <td>{item.name}</td>
                    <td><span className="status-badge">{item.status || 'Not Connected'}</span></td>
                    <td>
                      <button className="setup-btn-small">Setup</button>
                      <button onClick={() => deleteCarrier(item.id)} style={{marginLeft: '10px', color: 'red'}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="supplier-form-container">
              <div className="form-header">
                <h2>Add New Shipping</h2>
                <button type="button" className="close-btn" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="supplier-form">
                <div className="form-group">
                  <label>Shipping Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newCarrier.name}
                    onChange={(e) => setNewCarrier({...newCarrier, name: e.target.value})}
                    placeholder="Enter shipping name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Logo *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{marginBottom: '10px'}}
                  />
                  <input
                    type="text"
                    name="logo"
                    value={newCarrier.logo}
                    onChange={(e) => setNewCarrier({...newCarrier, logo: e.target.value})}
                    placeholder="Or enter logo URL"
                    required={!newCarrier.logo}
                  />
                  {newCarrier.logo && (
                    <img src={newCarrier.logo} alt="Preview" style={{width: '100px', marginTop: '10px', border: '1px solid #ddd', padding: '5px'}} />
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                    <CloseIcon />
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    <SaveIcon />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
