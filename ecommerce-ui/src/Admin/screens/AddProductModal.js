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
    setSelectedFile(e.target.files[0]);
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
              <EmailIcon className="field-icon" />
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Enter SKU"
            />
          </div>

          <div className="form-group">
            <label>
              <PhoneIcon className="field-icon" />
              Weight (lbs)
            </label>
            <input
              type="number"
              step="0.01"
              name="weightLbs"
              value={formData.weightLbs}
              onChange={handleChange}
              placeholder="Enter weight in lbs"
            />
          </div>

          <div className="form-group">
            <label>
              <PhoneIcon className="field-icon" />
              Weight (oz)
            </label>
            <input
              type="number"
              step="0.01"
              name="weightOz"
              value={formData.weightOz}
              onChange={handleChange}
              placeholder="Enter weight in oz"
            />
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
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId || ''}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name} (Main Category)</option>
              ))}
              {subCategories.map(subCat => (
                <option key={`sub-${subCat.id}`} value={subCat.id}>{subCat.name} (Subcategory)</option>
              ))}
            </select>
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