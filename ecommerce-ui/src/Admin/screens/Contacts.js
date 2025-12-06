import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd, MdClose, MdGridView, MdViewList, MdNavigateBefore, MdNavigateNext, MdMoreVert } from 'react-icons/md';
import { FaEdit, FaCloudDownloadAlt, FaTrashAlt } from 'react-icons/fa';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import '../css/Contacts-static.css';
import '../css/AdminModal.css';

const Contacts = ({ setActiveMenu }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: ''
  });
  const [editingContact, setEditingContact] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
        setFilteredContacts(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
    setCurrentPage(1);
  }, [searchTerm, contacts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  const handleAddContact = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingContact(null);
    setFormData({ fullName: '', email: '', phone: '', company: '', address: '', city: '', country: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        const response = await fetch(`http://localhost:8080/api/contacts/${editingContact.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          await fetchContacts();
          handleCloseForm();
          alert('Contact updated successfully!');
        }
      } else {
        const response = await fetch('http://localhost:8080/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          await fetchContacts();
          handleCloseForm();
          alert('Contact added successfully!');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      fullName: contact.fullName,
      email: contact.email,
      phone: contact.phone || '',
      company: contact.company,
      address: contact.address || '',
      city: contact.city || '',
      country: contact.country || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await fetch(`http://localhost:8080/api/contacts/${contactId}`, {
          method: 'DELETE'
        });
        alert('Contact deleted successfully!');
        await fetchContacts();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
    }
  };

  const handleView = (contact) => {
    if (setActiveMenu) {
      setActiveMenu('ContactDetails', { contactId: contact.id, contacts });
    }
  };

  const handleRowClick = (contact) => {
    if (setActiveMenu) {
      setActiveMenu('ContactDetails', { contactId: contact.id, contacts });
    }
  };

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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="admin contacts-container">

      {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading contacts...</div>}
      
      <div className="content-wrapper">
      <div className="filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-right">
          <div className="view-icons-top">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')} 
              title="Grid View"
            >
              <MdGridView />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')} 
              title="List View"
            >
              <MdViewList />
            </button>
          </div>
          <button className="add-contact-btn" onClick={handleAddContact}>
            <MdAdd /> Add Contact
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="table-wrapper">
          <table className="contacts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>E-mail</th>
              <th>Phone</th>
              <th>Company</th>
              <th style={{textAlign: 'right', paddingRight: '20px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact) => (
              <tr key={contact.id} className="clickable-row" onClick={() => handleRowClick(contact)}>
                <td>{contact.id}</td>
                <td className="name-cell">{contact.fullName}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.company}</td>
                <td className="actions-cell" style={{textAlign: 'right', paddingRight: '20px'}}>
                  <button 
                    className="action-btn edit-btn"
                    onClick={(e) => { e.stopPropagation(); handleEdit(contact); }}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-btn download-btn"
                    onClick={(e) => { e.stopPropagation(); handleView(contact); }}
                    title="Download"
                  >
                    <FaCloudDownloadAlt />
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }}
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      ) : (
        <div className="grid-wrapper">
          <div className="contacts-grid">
            {currentContacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <div className="card-header">
                  <h3>{contact.fullName}</h3>
                  <div className="card-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(contact)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn download-btn"
                      onClick={() => handleView(contact)}
                      title="Download"
                    >
                      <FaCloudDownloadAlt />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(contact.id)}
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p><strong>ID:</strong> {contact.id}</p>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Phone:</strong> {contact.phone}</p>
                  <p><strong>Company:</strong> {contact.company}</p>
                  <p><strong>Location:</strong> {contact.city}, {contact.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="table-footer">
        <div className="entries-info">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length} entries
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
      </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="supplier-form-container">
              <div className="form-header">
                <h2>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
                <button type="button" className="close-btn" onClick={handleCloseForm}>
                  <MdClose />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="supplier-form">
                <div className="form-grid" style={{maxHeight: '300px', overflowY: 'auto'}}>
                  <div className="form-group">
                    <label><PersonIcon className="field-icon" />Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter full name" required />
                  </div>
                  <div className="form-group">
                    <label><EmailIcon className="field-icon" />Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" required />
                  </div>
                  <div className="form-group">
                    <label><PhoneIcon className="field-icon" />Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" required />
                  </div>
                  <div className="form-group">
                    <label><BusinessIcon className="field-icon" />Company *</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Enter company name" required />
                  </div>
                  <div className="form-group">
                    <label><LocationOnIcon className="field-icon" />Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" />
                  </div>
                  <div className="form-group">
                    <label><LocationOnIcon className="field-icon" />City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter city" />
                  </div>
                  <div className="form-group">
                    <label><LocationOnIcon className="field-icon" />Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Enter country" />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={handleCloseForm}>
                    <CloseIcon />
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    <SaveIcon />
                    {editingContact ? 'Update Contact' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;