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

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
      setFilteredContacts(parsedContacts);
    } else {
      const defaultContacts = [
        { id: '09825', fullName: 'Glen Graham', email: 'glen_borer@damien.org', phone: '891-599-7471', company: 'Alphabet Inc.', address: '146 Railway Street, CYRDD GARDENS', city: 'Queensland', country: 'Australia' },
        { id: '42379', fullName: 'Russell Gregory', email: 'vincent_bode@gmail.com', phone: '555-0123', company: 'Hitachi', address: '123 Tech Street', city: 'Tokyo', country: 'Japan' },
        { id: '27993', fullName: 'Mark Sutton', email: 'kenyon_schaden@yahoo.com', phone: '555-0124', company: 'Match Group', address: '456 Dating Ave', city: 'New York', country: 'USA' },
        { id: '07370', fullName: 'Effie Schwartz', email: 'charley_wiza@gmail.com', phone: '555-0125', company: 'Grubhub', address: '789 Food Lane', city: 'Chicago', country: 'USA' },
        { id: '06608', fullName: 'Willie Lawson', email: 'buford.gottlieb@gmail.com', phone: '555-0126', company: 'Copart', address: '321 Auto Blvd', city: 'Dallas', country: 'USA' },
        { id: '92754', fullName: 'Isabella Greene', email: 'stan.kreiger@gmail.com', phone: '555-0127', company: 'Overstock', address: '654 Commerce St', city: 'Salt Lake City', country: 'USA' },
        { id: '53690', fullName: 'Madge Rodriguez', email: 'nels.powlowski@yahoo.com', phone: '555-0128', company: 'The Stars Group', address: '987 Gaming Way', city: 'Toronto', country: 'Canada' },
        { id: '11473', fullName: 'Evan Banks', email: 'shany_beer@waters.info', phone: '555-0129', company: 'Spotify', address: '147 Music Street', city: 'Stockholm', country: 'Sweden' },
        { id: '61659', fullName: 'Alvin Hale', email: 'quentin_nicolas@waters.ca', phone: '555-0130', company: 'ServiceNow', address: '258 Service Ave', city: 'Santa Clara', country: 'USA' },
        { id: '79680', fullName: 'Derrick Malone', email: 'andreanne.mclaughlin@hotmail.com', phone: '555-0131', company: 'Newegg', address: '369 Tech Plaza', city: 'Los Angeles', country: 'USA' },
        { id: '55623', fullName: 'Glenn Wong', email: 'jack.ullrich@kattie.name', phone: '555-0132', company: 'Lyft', address: '741 Ride Street', city: 'San Francisco', country: 'USA' },
        { id: '79862', fullName: 'Neil Taylor', email: 'eleonora.hane@blanda.tv', phone: '555-0133', company: 'Workday', address: '852 Work Lane', city: 'Pleasanton', country: 'USA' },
        { id: '79863', fullName: 'Adelaide Fitzgerald', email: 'frieda_larkin@hotmail.com', phone: '555-0134', company: 'TripAdvisor', address: '963 Travel Blvd', city: 'Needham', country: 'USA' }
      ];
      setContacts(defaultContacts);
      setFilteredContacts(defaultContacts);
      localStorage.setItem('contacts', JSON.stringify(defaultContacts));
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContact) {
      const updatedContacts = contacts.map(contact =>
        contact.id === editingContact.id ? { ...contact, ...formData } : contact
      );
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } else {
      const newContact = {
        id: Date.now().toString(),
        ...formData
      };
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }
    handleCloseForm();
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

  const handleDelete = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const updatedContacts = contacts.filter(c => c.id !== contactId);
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
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
        <div className="modal-overlay">
          <div className="modal-content">
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