import React, { useState } from "react";
import { FaStar, FaEllipsisV, FaPlus } from "react-icons/fa";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import "../css/Shipping.css";

const tabs = ["Shipping", "Marketplace", "Payments", "Accounting", "CRM"];

const integrationsData = [
  { name: "Fastway", logo: "http://www.fastway.in/assets/img/logo.png" },
  { name: "FedEx", logo: "https://www.pngmart.com/files/15/Fedex-Logo-Transparent-PNG.png" },
  { name: "FedEx Smart Post", logo: "https://logowik.com/content/uploads/images/fedex-smart-post8562.logowik.com.webp" },
  { name: "DPD UK", logo: "https://pretenzijos.dpd.lt/assets/images/logo_redgrad_rgb.png" },
  { name: "OnTrac", logo: "https://tse2.mm.bing.net/th/id/OIP.WTdFgsDpog94rV-G7j0ScgHaC9?pid=Api&P=0&h=180" },
  { name: "GCO", logo: "https://avatars.githubusercontent.com/u/30686998?s=280&v=4" },
  { name: "IMEX", logo: "https://tse2.mm.bing.net/th/id/OIP.qHkYYZesT49L-4dRG3ASLAAAAA?pid=Api&P=0&h=180" },
  { name: "Interlink Express", logo: "https://www.whichfranchise.com/com_images/interlink_express-logo.jpg" },
  { name: "LaserShip", logo: "https://logodix.com/logo/1990864.png" },
  { name: "LSO", logo: "https://cdn.prod.website-files.com/64700b7f349828a5b8dc81ab/663ea09915c985b5ef3f1602_img-carriers-squares1-lso.svg" },
];

export default function Shipping() {
  const [activeTab, setActiveTab] = useState("Shipping");
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [newCarrier, setNewCarrier] = useState({ name: '', logo: '' });
  const [carriersList, setCarriersList] = useState(integrationsData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(carriersList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = carriersList.slice(startIndex, startIndex + itemsPerPage);

  const handleAddCarrier = () => {
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCarrier.name && newCarrier.logo) {
      setCarriersList([...carriersList, newCarrier]);
      setNewCarrier({ name: '', logo: '' });
      setShowModal(false);
    }
  };

  return (
    <div className="integrations-container">
      <div className="content-wrapper">
        <div className="integrations-header">
          <h2>Integrations</h2>
        </div>
        
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
          {currentData.map((item, index) => (
            <div className="integration-card" key={index}>
              <div className="card-header">
                <span className="star">★</span>
                <span className="menu">⋮</span>
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
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.logo} alt={item.name} className="list-logo" /></td>
                  <td>{item.name}</td>
                  <td><span className="status-badge">Not Connected</span></td>
                  <td><button className="setup-btn-small">Setup</button></td>
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
                  <label>Logo</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="logo-file"
                      accept="image/*"
                      style={{display: 'none'}}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => setNewCarrier({...newCarrier, logo: e.target.result});
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="file-choose-btn-plain"
                      onClick={() => document.getElementById('logo-file').click()}
                    >
                      Choose File
                    </button>
                    <span className="file-status">
                      {newCarrier.logo ? 'File selected' : 'No file chosen'}
                    </span>
                  </div>
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