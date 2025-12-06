import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

const ContactView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/contacts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContact(data);
        } else {
          navigate('/admin/contacts');
        }
      } catch (error) {
        console.error('Error:', error);
        navigate('/admin/contacts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchContact();
  }, [id, navigate]);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!contact) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Contact not found</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Contact Details</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link 
            to={`/admin/contacts/edit/${contact.id}`}
            style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              padding: '10px 15px', 
              textDecoration: 'none', 
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <FaEdit /> Edit
          </Link>
          <button
            onClick={() => navigate('/admin/contacts')}
            style={{ 
              backgroundColor: '#6c757d', 
              color: 'white', 
              padding: '10px 15px', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#495057', marginBottom: '5px' }}>Name:</label>
            <p style={{ margin: 0, padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>{contact.name}</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#495057', marginBottom: '5px' }}>Email:</label>
            <p style={{ margin: 0, padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>{contact.email}</p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#495057', marginBottom: '5px' }}>Subject:</label>
            <p style={{ margin: 0, padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              {contact.subject || 'No subject provided'}
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#495057', marginBottom: '5px' }}>Message:</label>
            <p style={{ 
              margin: 0, 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px', 
              minHeight: '100px',
              whiteSpace: 'pre-wrap'
            }}>
              {contact.message}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#495057', marginBottom: '5px' }}>Created:</label>
              <p style={{ margin: 0, padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                {new Date(contact.createdAt).toLocaleString()}
              </p>
            </div>
            
            {contact.updatedAt && (
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#495057', marginBottom: '5px' }}>Last Updated:</label>
                <p style={{ margin: 0, padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  {new Date(contact.updatedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;