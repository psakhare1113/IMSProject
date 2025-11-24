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

const staticProducts = [
  {
    id: 1,
    name: "Modern Sofa",
    description: "Comfortable 3-seater sofa",
    price: 899.99,
    quantity: 5,
    imageUrl: "https://via.placeholder.com/300x200?text=Modern+Sofa",
    status: "ACTIVE",
    category: { id: 4, name: "Living Room Furniture" },
    sku: "SOF001",
    weightLbs: 85,
    weightOz: 0,
    tags: "furniture,living room,sofa",
    handlingTime: "2-3 days",
    asin: "B08XYZ123",
    isbn: "",
    warehouseBin: "A1-B2",
    countryOfManufacture: "USA",
    wholesalePrice: 650.00,
    reorderPoint: 2,
    reorderQuantity: 10,
    trackStock: true,
    inStock: 5,
    lowStock: 2
  }
];

export default function ProductForm() {
  const [product, setProduct] = useState({ 
    name: "", description: "", price: "", quantity: "", imageUrl: "", category: null,
    sku: "", weightLbs: "", weightOz: "", tags: "", handlingTime: "", asin: "", isbn: "",
    warehouseBin: "", countryOfManufacture: "", wholesalePrice: "", reorderPoint: "",
    reorderQuantity: "", trackStock: true, inStock: "", lowStock: "", status: "ACTIVE"
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categories] = useState(staticCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = () => {
    const foundProduct = staticProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError('Product not found.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'categoryId') {
      const selectedCategory = categories.find(cat => cat.id === parseInt(value));
      setProduct({ ...product, category: selectedCategory });
    } else {
      setProduct({ ...product, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = () => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      let imageUrl = product.imageUrl;
      if (selectedFile) {
        imageUrl = uploadImage();
      }
      
      const productData = {
        ...product,
        price: parseFloat(product.price) || 0,
        quantity: parseInt(product.quantity) || 0,
        weightLbs: parseFloat(product.weightLbs) || 0,
        weightOz: parseFloat(product.weightOz) || 0,
        wholesalePrice: parseFloat(product.wholesalePrice) || 0,
        reorderPoint: parseInt(product.reorderPoint) || 0,
        reorderQuantity: parseInt(product.reorderQuantity) || 0,
        inStock: parseInt(product.inStock) || 0,
        lowStock: parseInt(product.lowStock) || 0,
        imageUrl: imageUrl
      };
      
      console.log(id ? 'Updating product:' : 'Creating product:', productData);
      alert(id ? 'Product updated successfully!' : 'Product created successfully!');
      setLoading(false);
      navigate("/products");
    }, 1000);
  };

  if (loading && id) {
    return <div className="suppliers-container">Loading product...</div>;
  }

  return (
    <div className="suppliers-container">
      <div className="page-title">
        <h2>{id ? "✏️ Edit Product" : "➕ Add New Product"}</h2>
      </div>
      {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '20px'}}>{error}</div>}
      <form onSubmit={handleSubmit} className="content-wrapper" style={{padding: '20px'}}>
        <div style={{marginBottom: '20px'}}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            className="search-bar"
            style={{width: '100%'}}
          />
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={product.sku}
            onChange={handleChange}
            className="search-bar"
          />
          <input
            type="number"
            name="weightLbs"
            placeholder="Weight (lbs)"
            value={product.weightLbs}
            onChange={handleChange}
            className="search-bar"
          />
          <input
            type="number"
            name="weightOz"
            placeholder="Weight (oz)"
            value={product.weightOz}
            onChange={handleChange}
            className="search-bar"
          />
        </div>
        <div style={{marginBottom: '20px'}}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="search-bar"
            style={{width: '100%'}}
          />
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="search-bar"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            min="0"
            className="search-bar"
          />
        </div>
        <div style={{marginBottom: '20px'}}>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="entries-select"
            style={{width: '100%', padding: '10px'}}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="DISCONTINUED">Discontinued</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>
        </div>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Category:</label>
          <select
            name="categoryId"
            value={product.category?.id || ''}
            onChange={handleChange}
            className="entries-select"
            style={{width: '100%', padding: '10px'}}
          >
            <option value="">Select Category</option>
            {categories.map(cat =>
              <option key={cat.id} value={cat.id}>
                {cat.parent ? `${cat.parent.name} > ${cat.name}` : cat.name}
              </option>
            )}
          </select>
        </div>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{marginBottom: '10px'}}
          />
          {product.imageUrl && (
            <div style={{marginTop: '10px'}}>
              <img
                src={product.imageUrl}
                alt="Product"
                style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px'}}
              />
            </div>
          )}
        </div>
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
          <button
            type="submit"
            disabled={loading || uploading}
            className="add-packages-btn"
          >
            {uploading ? "Uploading..." : loading ? "Saving..." : (id ? "Update Product" : "Save Product")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="btn btn-pdf"
          >
            Back to Products
          </button>
        </div>
      </form>
    </div>
  );
}