import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import '../css/AddSupplierForm.css';

function AddCategoryModal({ onClose, onSubmit, editingCategory, formData, setFormData }) {
  const [errors, setErrors] = useState({});
  const [parentCategories, setParentCategories] = useState([]);

  // Fetch existing categories to use as parent options
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories/Categories');
        if (response.ok) {
          const categories = await response.json();
          setParentCategories(categories);
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Category name is required';
    
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
        <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
      </div>

      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              <LocationOnIcon className="field-icon" />
              Parent Category (Optional)
            </label>
            <select
              name="parentId"
              value={formData.parentId || ''}
              onChange={handleChange}
            >
              <option value="">Create as Main Category</option>
              {parentCategories
                .filter(cat => !cat.parentCategory) // Only show main categories
                .map(cat => 
                  <option key={cat.id} value={cat.id}>
                    {cat.name} (Main Category)
                  </option>
                )
              }
            </select>
          </div>

          <div className="form-group">
            <label>
              <PersonIcon className="field-icon" />
              Category Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter category name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {!formData.parentId && (
            <div className="form-group">
              <label>
                <PersonIcon className="field-icon" />
                Category Image (Optional)
              </label>
              <select
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleChange}
              >
                <option value="">Select Image</option>
                <option value="beds.png">Beds</option>
                <option value="chairs.png">Chairs</option>
                <option value="sofas.png">Sofas</option>
                <option value="dining.png">Dining Tables</option>
                <option value="tvmedia.png">TV & Media Units</option>
                <option value="wardoes.png">Wardrobes</option>
                <option value="dressingtable.png">Dressing Tables</option>
                <option value="shoeeracks.png">Shoe Racks</option>
                <option value="studytable.png">Study Tables</option>
                <option value="books.png">Book Shelves</option>
                <option value="slidetable.png">Side Tables</option>
                <option value="drawers.png">Chest of Drawers</option>
                <option value="livingroom.png">Living Room</option>
                <option value="bedroom.png">Bedroom</option>
                <option value="diningroom.png">Dining Room</option>
                <option value="studyroom.png">Study Room</option>
                <option value="office.webp">Office</option>
                <option value="kitchen.png">Kitchen</option>
                <option value="Appliances.png">Appliances</option>
                <option value="beauty.png">Beauty</option>
                <option value="booksstationary.png">Books & Stationary</option>
                <option value="digitalproducts.png">Digital Products</option>
                <option value="Electronic.png">Electronics</option>
                <option value="fashion.png">Fashion</option>
                <option value="footwear.png">Footwear</option>
                <option value="furniture.png">Furniture</option>
                <option value="Grocery.png">Grocery</option>
                <option value="homeKitchen.png">Home & Kitchen</option>
                <option value="sportsfitness.png">Sports & Fitness</option>
                <option value="watches.png">Watches</option>
                <option value="decor.png">Decor</option>
              </select>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            <CloseIcon />
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            <SaveIcon />
            {editingCategory ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryModal;