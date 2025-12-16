import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import '../css/AddSupplierForm.css';

function AddProductModal({ onClose, onSubmit, editingProduct, formData, setFormData }) {
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch categories and subcategories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoriesResponse, subCategoriesResponse] = await Promise.all([
          fetch('http://localhost:8080/api/categories/Categories'),
          fetch('http://localhost:8080/api/categories/subcategories')
        ]);
        
        if (categoriesResponse.ok) {
          const dbCategories = await categoriesResponse.json();
          setCategories(dbCategories);
        }
        
        if (subCategoriesResponse.ok) {
          const dbSubCategories = await subCategoriesResponse.json();
          setSubCategories(dbSubCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        imageUrl: imageUrl
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';
    
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
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter product name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>
              <PhoneIcon className="field-icon" />
              Price *
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              placeholder="Enter price"
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
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
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DISCONTINUED">Discontinued</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
              Subcategory
            </label>
            <select
              name="categoryId"
              value={formData.categoryId || ''}
              onChange={handleChange}
            >
              <option value="">Select subcategory</option>
              {subCategories.map(subCat => (
                <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <PhoneIcon className="field-icon" />
              MRP (Original Price)
            </label>
            <input
              type="number"
              step="0.01"
              name="mrp"
              value={formData.mrp || ''}
              onChange={handleChange}
              placeholder="Enter MRP"
            />
          </div>

          <div className="form-group">
            <label>
              <PersonIcon className="field-icon" />
              Discount
            </label>
            <input
              type="text"
              name="discount"
              value={formData.discount || ''}
              onChange={handleChange}
              placeholder="e.g., 20% OFF"
            />
          </div>

          <div className="form-group">
            <label>
              <PersonIcon className="field-icon" />
              Material
            </label>
            <input
              type="text"
              name="material"
              value={formData.material || ''}
              onChange={handleChange}
              placeholder="e.g., Solid Wood"
            />
          </div>

          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
              Dimensions
            </label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions || ''}
              onChange={handleChange}
              placeholder="e.g., 120 x 60 x 45 cm"
            />
          </div>

          <div className="form-group">
            <label>
              <PersonIcon className="field-icon" />
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color || ''}
              onChange={handleChange}
              placeholder="Enter color"
            />
          </div>

          <div className="form-group">
            <label>
              <PhoneIcon className="field-icon" />
              Warranty
            </label>
            <input
              type="text"
              name="warranty"
              value={formData.warranty || ''}
              onChange={handleChange}
              placeholder="e.g., 1 Year"
            />
          </div>

          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
              Delivery Info
            </label>
            <input
              type="text"
              name="delivery"
              value={formData.delivery || ''}
              onChange={handleChange}
              placeholder="e.g., Free Delivery in 5-7 days"
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <EmailIcon className="field-icon" />
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="Enter description"
            rows="3"
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>
            <EmailIcon className="field-icon" />
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
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

export default AddProductModal;