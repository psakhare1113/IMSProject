import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdEdit, MdDelete, MdEmail, MdPhone, MdLocationOn, MdBusiness } from 'react-icons/md';
import { FaUser, FaIdCard, FaGlobe } from 'react-icons/fa';
import '../css/ContactDetails.css';

const ContactDetails = ({ contactId, setActiveMenu, contacts }) => {
  const [contact, setContact] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(contactId);

  useEffect(() => {
    if (contacts && selectedContactId) {
      const foundContact = contacts.find(c => c.id === selectedContactId);
      setContact(foundContact);
    }
  }, [selectedContactId, contacts]);

  const handleContactSelect = (id) => {
    setSelectedContactId(id);
  };

  const handleBack = () => {
    setActiveMenu('Contacts');
  };

  if (!contact) {
    return <div className="loading">Loading contact details...</div>;
  }

  return (
    <div className="contact-details-container">
      {/* Left Sidebar - Contact List */}
      <div className="contacts-sidebar">
        <div className="sidebar-header">
          <h3>All Contacts</h3>
          <span className="contact-count">{contacts?.length || 0}</span>
        </div>
        <div className="contacts-list">
          {contacts?.map((c) => (
            <div
              key={c.id}
              className={`contact-item ${selectedContactId === c.id ? 'active' : ''}`}
              onClick={() => handleContactSelect(c.id)}
            >
              <div className="contact-avatar">
                <FaUser />
              </div>
              <div className="contact-info">
                <div className="contact-name">{c.fullName}</div>
                <div className="contact-id">ID: {c.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="contact-main-content">
        {/* Header */}
        <div className="content-header">
          <button className="back-btn" onClick={handleBack}>
            <MdArrowBack /> Back to Contacts
          </button>
          <div className="header-actions">
            <button className="action-btn edit-btn">
              <MdEdit /> Edit
            </button>
            <button className="action-btn delete-btn">
              <MdDelete /> Delete
            </button>
          </div>
        </div>

        {/* Contact Details Card */}
        <div className="contact-details-card">
          <div className="card-header">
            <div className="contact-avatar-large">
              <FaUser />
            </div>
            <div className="contact-title">
              <h1>{contact.fullName}</h1>
              <p className="contact-subtitle">{contact.company}</p>
            </div>
          </div>

          <div className="contact-details-grid">
            <div className="detail-section">
              <h3>Personal Information</h3>
              <div className="detail-row">
                <div className="detail-item">
                  <FaIdCard className="detail-icon" />
                  <div className="detail-content">
                    <label>Contact ID</label>
                    <span>{contact.id}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FaUser className="detail-icon" />
                  <div className="detail-content">
                    <label>Full Name</label>
                    <span>{contact.fullName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Contact Information</h3>
              <div className="detail-row">
                <div className="detail-item">
                  <MdEmail className="detail-icon" />
                  <div className="detail-content">
                    <label>Email Address</label>
                    <span>{contact.email}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <MdPhone className="detail-icon" />
                  <div className="detail-content">
                    <label>Phone Number</label>
                    <span>{contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Business Information</h3>
              <div className="detail-row">
                <div className="detail-item">
                  <MdBusiness className="detail-icon" />
                  <div className="detail-content">
                    <label>Company</label>
                    <span>{contact.company}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <MdLocationOn className="detail-icon" />
                  <div className="detail-content">
                    <label>Address</label>
                    <span>{contact.address || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Location Information</h3>
              <div className="detail-row">
                <div className="detail-item">
                  <MdLocationOn className="detail-icon" />
                  <div className="detail-content">
                    <label>City</label>
                    <span>{contact.city || 'Not provided'}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FaGlobe className="detail-icon" />
                  <div className="detail-content">
                    <label>Country</label>
                    <span>{contact.country || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="activity-section">
            <h3>Recent Activity</h3>
            <div className="activity-timeline">
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <span className="activity-title">Contact Created</span>
                  <span className="activity-time">Today</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <span className="activity-title">Last Updated</span>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;