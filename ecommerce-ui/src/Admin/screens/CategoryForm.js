import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/SuppliersPage.css';

const staticCategories = [
  { id: 1, name: "Home & Kitchen", parent: null },
  { id: 2, name: "Furniture", parent: null },
  { id: 3, name: "Kitchen Appliances", parent: { id: 1, name: "Home & Kitchen" } },
  { id: 4, name: "Living Room Furniture", parent: { id: 2, name: "Furniture" } },
  { id: 5, name: "Bedroom Furniture", parent: { id: 2, name: "Furniture" } }
];

const MAIN_CATEGORIES = ["Electronics", "Clothing", "Home & Kitchen", "Furniture", "Books"];

export default function CategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [parentName, setParentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadCategory();
    }
  }, [id]);

  const loadCategory = () => {
    const foundCategory = staticCategories.find(c => c.id === parseInt(id));
    if (foundCategory) {
      setCategoryName(foundCategory.name);
      setParentName(foundCategory.parent?.name || "");
    } else {
      setError('Category not found.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError('Please enter a category name.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      const categoryData = {
        name: categoryName,
        parent: parentName ? { name: parentName } : null
      };
      
      console.log(id ? 'Updating category:' : 'Creating category:', categoryData);
      alert(id ? 'Category updated successfully!' : 'Category created successfully!');
      setLoading(false);
      navigate("/categories");
    }, 1000);
  };

  if (loading && id) {
    return <div className="suppliers-container">Loading category...</div>;
  }

  return (
    <div className="suppliers-container">
      <div className="page-title">
        <h2>{id ? "✏️ Edit Category" : "➕ Add New Category"}</h2>
      </div>
      {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '20px'}}>{error}</div>}
      
      <form onSubmit={handleSubmit} className="content-wrapper" style={{padding: '20px'}}>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Parent Category (Optional):</label>
          <select
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            className="entries-select"
            style={{width: '100%', padding: '10px'}}
          >
            <option value="">Main Category (No Parent)</option>
            {MAIN_CATEGORIES.map(cat => 
              <option key={cat} value={cat}>{cat}</option>
            )}
          </select>
        </div>
        
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Category Name:</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="search-bar"
            style={{width: '100%'}}
            required
          />
        </div>
        
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
          <button
            type="submit"
            disabled={loading}
            className="add-packages-btn"
          >
            {loading ? "Saving..." : (id ? "Update Category" : "Save Category")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="btn btn-pdf"
          >
            Back to Categories
          </button>
        </div>
      </form>
    </div>
  );
}