import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCategoryModal from './AddCategoryModal';
import * as XLSX from 'xlsx';
import '../css/SuppliersPage.css';
import '../css/Packages.css';
import '../css/AdminModal.css';



export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('categories'); // 'categories' or 'subcategories'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState('list');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    parentName: ""
  });

  const deleteCategory = async (id) => {
    const itemType = viewType === 'categories' ? 'category' : 'subcategory';
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      try {
        const url = viewType === 'categories' 
          ? `http://localhost:8080/api/categories/${id}`
          : `http://localhost:8080/api/categories/subcategories/${id}`;
        
        const response = await fetch(url, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          // Remove from local state immediately
          if (viewType === 'categories') {
            setCategories(prev => prev.filter(cat => cat.id !== id));
          } else {
            setSubCategories(prev => prev.filter(sub => sub.id !== id));
          }
          alert(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted successfully!`);
        } else {
          const errorText = await response.text();
          alert(`Failed to delete ${itemType}: ${errorText}`);
        }
      } catch (error) {
        console.error(`Error deleting ${itemType}:`, error);
        alert(`Error deleting ${itemType}`);
      }
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      parentId: ""
    });
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      parentId: category.parentCategory?.id || ""
    });
    setShowForm(true);
  };

  // Fetch categories and subcategories from database
  const fetchCategories = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Create a mapping of category ID to category name
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        const response = await fetch(`http://localhost:8080/api/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name, description: formData.description || '' })
        });
        if (response.ok) {
          await fetchCategories();
          alert('Category updated successfully!');
        } else {
          alert('Failed to update category');
        }
      } else {
        if (formData.parentId) {
          // Create subcategory
          const response = await fetch('http://localhost:8080/api/categories/subcategory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              categoryId: formData.parentId, 
              name: formData.name 
            })
          });
          if (response.ok) {
            await fetchCategories();
            alert('Subcategory added successfully!');
          } else {
            alert('Failed to add subcategory');
          }
        } else {
          // Create main category
          const response = await fetch('http://localhost:8080/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: formData.name, description: formData.description || '' })
          });
          if (response.ok) {
            await fetchCategories();
            alert('Main category added successfully!');
          } else {
            alert('Failed to add main category');
          }
        }
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const currentData = viewType === 'categories' ? categories : subCategories;
  const filteredData = currentData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const exportToPDF = () => {
    const printContent = `
      <h2>Categories List Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Parent Category</th>
          </tr>
        </thead>
        <tbody>
          ${filteredData.map(category => `
            <tr>
              <td>${category.id}</td>
              <td>${category.name}</td>
              <td>${category.parent ? category.parent.name : 'None'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const categoryData = filteredData.map(category => ({
      'ID': category.id,
      'Name': category.name,
      'Parent Category': category.parent ? category.parent.name : 'None'
    }));
    const worksheet = XLSX.utils.json_to_sheet(categoryData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories List');
    XLSX.writeFile(workbook, 'categories_list.xlsx');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const fileText = document.querySelector('.file-input-text');
    if (file) {
      fileText.textContent = `${file.name} | File selected`;
    } else {
      fileText.textContent = 'Choose File | No file chosen';
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      console.log('Importing file:', selectedFile.name);
      alert(`File "${selectedFile.name}" imported successfully!`);
      setSelectedFile(null);
      document.querySelector('.file-input-text').textContent = 'Choose File | No file chosen';
      document.getElementById('file-input').value = '';
    } else {
      alert('Please select a file to import');
    }
  };

  return (
    <div className="admin suppliers-container">
      <div className="page-title">
        <h2>🏷️ Category Management</h2>
      </div>

      <div className="content-wrapper">
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading categories...</div>}
        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="filter-right">
            <div className="view-icons-top">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <GridViewIcon fontSize="medium" />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <ViewListIcon fontSize="medium" />
              </button>
            </div>
            
            <div className="show-entries">
              <span>Show </span>
              <select
                className="entries-select"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span> entries</span>
            </div>
            
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewType === 'categories' ? 'active' : ''}`}
                onClick={() => setViewType('categories')}
              >
                Main Categories ({categories.length})
              </button>
              <button 
                className={`toggle-btn ${viewType === 'subcategories' ? 'active' : ''}`}
                onClick={() => setViewType('subcategories')}
              >
                Subcategories ({subCategories.length})
              </button>
            </div>
            <button className="add-packages-btn" onClick={handleAdd}>
              + Add {viewType === 'categories' ? 'Category' : 'Subcategory'}
            </button>
            <button className="btn btn-pdf" onClick={exportToPDF}>
              📄 Export PDF
            </button>
            <button className="btn btn-excel" onClick={exportToExcel}>
              📊 Export Excel
            </button>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '18px', color: '#6c757d' }}>No categories found.</p>
            <button className="add-packages-btn" onClick={handleAdd}>Add your first category</button>
          </div>
        ) : (
          viewMode === 'list' ? (
            <div className="packages-table-container">
              <table className="packages-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>{viewType === 'categories' ? 'Type' : 'Parent Category'}</th>
                    <th style={{textAlign: 'right', paddingRight: '20px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 1 ? 'row-alternate' : ''}
                    >
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        {viewType === 'categories' ? 
                          'Main Category' : 
                          getCategoryName(item.categoryId)
                        }
                      </td>
                      <td style={{textAlign: 'right', paddingRight: '20px'}}>
                        <div className="action-buttons">
                          <button
                            className="action-btn edit-btn"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete-btn"
                            title="Delete"
                            onClick={() => deleteCategory(item.id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid-wrapper">
              <div className="packages-grid">
                {filteredData.slice(startIndex, startIndex + itemsPerPage).map((item) => (
                  <div key={item.id} className="package-card">
                    <div className="card-header">
                      <h3>{item.name}</h3>
                      <div className="card-actions">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(item)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          title="Delete"
                          onClick={() => deleteCategory(item.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p>
                        <strong>ID: </strong>{item.id}
                      </p>
                      <p>
                        <strong>Type: </strong>
                        {viewType === 'categories' ? 'Main Category' : 'Subcategory'}
                      </p>
                      {viewType === 'subcategories' && (
                        <p>
                          <strong>Parent: </strong>
                          {getCategoryName(item.categoryId)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          «
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
          »
        </button>
      </div>

     

      {/* Add Category Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            <AddCategoryModal 
              onClose={() => setShowForm(false)} 
              onSubmit={handleFormSubmit}
              editingCategory={editingCategory}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      )}
    </div>
  );
}