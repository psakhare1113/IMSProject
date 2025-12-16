import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Setting.css';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { FaFolder, FaEllipsisV } from 'react-icons/fa';

const Setting = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');

  const menuItems = [
    { id: 1, name: 'Users', path: '/users' },
    { id: 2, name: 'Items', path: null },
    { id: 3, name: 'Locations', path: null },
    { id: 4, name: 'Inventory Adjustment', path: null },
    { id: 5, name: 'Configuration', path: null },
    { id: 6, name: 'Company Profile', path: '/company-profile' }
  ];

  const handleItemClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="settings-container">
      <div className="content-wrapper">
        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search settings..."
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
          </div>
        </div>

        {viewMode === 'grid' && (
          <div className="tabs-row">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="tab-btn"
                onClick={() => handleItemClick(item.path)}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        {viewMode === 'list' ? (
          <div className="settings-list">
            {menuItems.map((item) => (
              <div key={item.id} className="settings-item" onClick={() => handleItemClick(item.path)}>
                <span className="item-name">{item.name}</span>
                <div className="item-icons">
                  <span className="star-icon">☆</span>
                  <FaFolder className="folder-icon" />
                  <FaEllipsisV className="menu-icon" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="settings-grid">
            {menuItems.map((item) => (
              <div key={item.id} className="settings-card" onClick={() => handleItemClick(item.path)}>
                <h3>{item.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
