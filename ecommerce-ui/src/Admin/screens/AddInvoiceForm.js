import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import '../css/AddSupplierForm.css';

function AddInvoiceForm({ onClose, onSubmit, editingInvoice, formData, setFormData }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount' || name === 'tax') {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.invoiceNumber.trim()) newErrors.invoiceNumber = 'Invoice number is required';
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!formData.amount.trim()) newErrors.amount = 'Amount is required';
    if (!formData.dueDate.trim()) newErrors.dueDate = 'Due date is required';
    if (!formData.status.trim()) newErrors.status = 'Status is required';
    
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
        <h2>{editingInvoice ? 'Edit Invoice' : 'Add New Invoice'}</h2>
      </div>

      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              <PersonIcon className="field-icon" />
              Invoice Number *
            </label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className={errors.invoiceNumber ? 'error' : ''}
              placeholder="Enter invoice number"
            />
            {errors.invoiceNumber && <span className="error-text">{errors.invoiceNumber}</span>}
          </div>

          <div className="form-group">
            <label>
              <EmailIcon className="field-icon" />
              Customer Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={errors.customerName ? 'error' : ''}
              placeholder="Enter customer name"
            />
            {errors.customerName && <span className="error-text">{errors.customerName}</span>}
          </div>

          <div className="form-group">
            <label>
              <PhoneIcon className="field-icon" />
              Amount *
            </label>
            <input
              type="number"
              step="0.01"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={errors.amount ? 'error' : ''}
              placeholder="Enter amount"
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
              Tax Amount
            </label>
            <input
              type="number"
              step="0.01"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              placeholder="Enter tax amount"
            />
          </div>

          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
              Due Date *
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? 'error' : ''}
            />
            {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
          </div>

          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={errors.status ? 'error' : ''}
            >
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {errors.status && <span className="error-text">{errors.status}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            <CloseIcon />
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            <SaveIcon />
            {editingInvoice ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInvoiceForm;