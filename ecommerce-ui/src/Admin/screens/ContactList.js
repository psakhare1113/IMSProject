import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { contactService } from '../../services/contactService';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(contactService.getAllContacts());
  }, []);

  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      contactService.deleteContact(id);
      setContacts(contactService.getAllContacts());
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Contact Management</h2>
        <Link to="/admin/contacts/new" style={{ 
          backgroundColor: '#007bff', 
          color: 'white', 
          padding: '10px 15px', 
          textDecoration: 'none', 
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <FaPlus /> Add Contact
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Subject</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
                No contacts found
              </td>
            </tr>
          ) : (
            contacts.map(contact => (
              <tr key={contact.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px' }}>{contact.name}</td>
                <td style={{ padding: '12px' }}>{contact.email}</td>
                <td style={{ padding: '12px' }}>{contact.subject || 'No subject'}</td>
                <td style={{ padding: '12px' }}>{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <Link to={`/admin/contacts/view/${contact.id}`} style={{ color: '#28a745', fontSize: '16px' }}>
                      <FaEye />
                    </Link>
                    <Link to={`/admin/contacts/edit/${contact.id}`} style={{ color: '#007bff', fontSize: '16px' }}>
                      <FaEdit />
                    </Link>
                    <button 
                      onClick={() => deleteContact(contact.id)}
                      style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '16px', cursor: 'pointer' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;