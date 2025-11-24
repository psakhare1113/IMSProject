import { useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone, FaTimes, FaPlus } from 'react-icons/fa';
import '../css/AddSupplierForm.css';

export default function AddCustomerForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    contact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.email || !formData.contact) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="supplier-form-container">
      <div className="form-header">
        <h2>Add New Customer</h2>
      </div>
      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="field-icon" />
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">
              <FaMapMarkerAlt className="field-icon" />
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter customer address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="field-icon" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter customer email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">
              <FaPhone className="field-icon" />
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            <FaTimes /> Cancel
          </button>
          <button type="submit" className="btn-submit">
            <FaPlus /> Add Customer
          </button>
        </div>
      </form>
    </div>
  );
}