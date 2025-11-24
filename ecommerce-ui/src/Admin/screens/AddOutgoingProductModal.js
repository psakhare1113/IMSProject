import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import '../css/AddSupplierForm.css';

function AddOutgoingProductModal({ onClose, onSubmit, editingProduct, formData, setFormData }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.customer.trim()) newErrors.customer = 'Customer is required';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';

    if (!formData.date.trim()) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  return (
    <div className="supplier-form-container">
      <div className="form-header">
        <h2>{editingProduct ? 'Edit Outgoing Product' : 'Add New Outgoing Product'}</h2>
      </div>

      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              <PersonIcon className="field-icon" />
              Product Name *
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={errors.productName ? 'error' : ''}
              placeholder="Enter product name"
            />
            {errors.productName && <span className="error-text">{errors.productName}</span>}
          </div>

          <div className="form-group">
            <label>
              <EmailIcon className="field-icon" />
              Customer *
            </label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              className={errors.customer ? 'error' : ''}
              placeholder="Enter customer name"
            />
            {errors.customer && <span className="error-text">{errors.customer}</span>}
          </div>

          <div className="form-group">
            <label>
              <PhoneIcon className="field-icon" />
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={errors.quantity ? 'error' : ''}
              placeholder="Enter quantity"
            />
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>



          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            <CloseIcon />
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            <SaveIcon />
            {editingProduct ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOutgoingProductModal;