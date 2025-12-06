import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrashAlt, FaCalendarAlt, FaCloudDownloadAlt } from "react-icons/fa";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import "../css/SuppliersPage.css";
import "../css/Packages.css";
import "../css/AdminModal.css";





const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    orderNo: "",
    customer: "",
    date: "",
    invoiced: "",
    packed: "",
    shipped: "",
    amount: "",
    status: "Confirmed",
    productName: "",
    quantity: 1
  });
  const itemsPerPage = 5;

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    // Search will be handled by filteredOrders below
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    // Filter will be handled by filteredOrders below
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(search.toLowerCase()) ||
      String(order.orderNo).includes(search.toLowerCase());
    const matchesStatus = filter === "All" ? true : order.status === filter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Fetch products for dropdown
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (response.ok) {
        const productList = await response.json();
        setProducts(productList);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAdd = () => {
    setEditingOrder(null);
    setFormData({
      orderNo: "",
      customer: "",
      date: "",
      invoiced: "",
      packed: "",
      shipped: "",
      amount: "",
      status: "Confirmed",
      productName: "",
      quantity: 1
    });
    fetchProducts();
    setShowForm(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      orderNo: order.orderNo,
      customer: order.customer,
      date: order.date,
      invoiced: order.invoiced,
      packed: order.packed !== 'Not Packed' ? order.packed : '',
      shipped: order.shipped !== 'Not Shipped' ? order.shipped : '',
      amount: order.amount,
      status: order.status,
      productName: "",
      quantity: 1
    });
    fetchProducts();
    setShowForm(true);
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchOrders();
          alert('Order deleted successfully!');
        } else {
          alert('Failed to delete order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Error deleting order');
      }
    }
  };

  // Fetch orders from database
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/orders/admin/getAllOrders');
      if (response.ok) {
        const dbOrders = await response.json();
        // Convert backend format to UI format
        const uiOrders = dbOrders.map(order => ({
          id: order.id,
          orderNo: order.id.toString(),
          customer: order.customer?.name || 'Unknown Customer',
          date: new Date(order.orderDate).toLocaleDateString(),
          invoiced: `₹${order.totalAmount || 0}`,
          packed: order.packedDate ? new Date(order.packedDate).toLocaleDateString() : 'Not Packed',
          shipped: order.shippedDate ? new Date(order.shippedDate).toLocaleDateString() : 'Not Shipped',
          amount: `₹${order.totalAmount || 0}`,
          status: order.status || 'Pending'
        }));
        setOrders(uiOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOrder) {
        // Update existing order
        const orderData = {
          status: formData.status,
          orderItems: [{
            productName: formData.productName || 'Updated Product',
            quantity: parseInt(formData.quantity),
            price: parseFloat(formData.amount.replace('₹', '')) || 0
          }]
        };
        
        const response = await fetch(`http://localhost:8080/api/orders/${editingOrder.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
          await fetchOrders();
          setShowForm(false);
          setEditingOrder(null);
          alert('Order updated successfully!');
        } else {
          alert('Failed to update order');
        }
      } else {
        // Create new order
        const customerRefNumber = `CUST-${Date.now()}`;
        
        const customerData = {
          customerRefNumber: customerRefNumber,
          name: formData.customer,
          phoneNumber: '0000000000',
          shippingDetails: {
            address1: 'Default Address',
            address2: '',
            area: 'Default Area'
          },
          paymentDetails: {
            paymentType: 'CASH',
            maskedCardNumber: '',
            transactionReference: ''
          }
        };
        
        const customerResponse = await fetch('http://localhost:8080/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customerData)
        });
        
        if (customerResponse.ok) {
          if (!formData.productName) {
            alert('Please select a product');
            return;
          }
          
          const orderData = {
            status: formData.status,
            orderItems: [{
              productName: formData.productName,
              quantity: parseInt(formData.quantity),
              price: parseFloat(formData.amount.replace('₹', '')) || 0
            }]
          };
          
          const orderResponse = await fetch(`http://localhost:8080/api/orders/${customerRefNumber}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
          });
          
          if (orderResponse.ok) {
            await fetchOrders();
            setShowForm(false);
            setCurrentPage(1);
            alert('Order added successfully!');
          } else {
            const errorText = await orderResponse.text();
            alert(`Failed to create order: ${errorText}`);
          }
        } else {
          alert('Failed to create customer');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing order');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin packages-container">
      <div className="content-wrapper">
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading orders...</div>}
        <div className="filter-section">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
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
            <div className="status-container">
              <span className="status-label">Status</span>
              <select
                className="status-dropdown"
                value={filter}
                onChange={handleFilter}
              >
                <option value="All">All</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
                <option value="Void">Void</option>
              </select>
            </div>

            <div className="calendar-container">
              <div className="calendar-circle">
                <FaCalendarAlt />
              </div>
            </div>

            <button className="add-packages-btn" onClick={handleAdd}>+ Add Order</button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="packages-table-container">
            <table className="packages-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order Number</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Invoiced</th>
                  <th>Packed</th>
                  <th>Shipped</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th style={{textAlign: 'right', paddingRight: '20px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((o, index) => (
                  <tr key={index} className="table-row">
                    <td className="package-id">{o.id}</td>
                    <td>{o.orderNo}</td>
                    <td className="package-name">{o.customer}</td>
                    <td>{o.date}</td>
                    <td>{o.invoiced}</td>
                    <td>{o.packed}</td>
                    <td>{o.shipped}</td>
                    <td>{o.amount}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          o.status === "Confirmed"
                            ? "delivered"
                            : o.status === "Draft"
                            ? "shipped"
                            : o.status === "Closed"
                            ? "delivered"
                            : "not-shipped"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td style={{textAlign: 'right', paddingRight: '20px'}}>
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit-btn" 
                          title="Edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(o);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button className="action-btn download-btn" title="View">
                          <FaEye />
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          title="Delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(o.id);
                          }}
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
              {currentOrders.map((o) => (
                <div key={o.id} className="package-card">
                  <div className="card-header">
                    <h3>{o.customer}</h3>
                    <div className="card-actions">
                      <button 
                        className="action-btn edit-btn" 
                        title="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(o);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button className="action-btn download-btn" title="View">
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(o.id);
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p><strong>ID:</strong> {o.id}</p>
                    <p><strong>Order No:</strong> {o.orderNo}</p>
                    <p><strong>Date:</strong> {o.date}</p>
                    <p><strong>Amount:</strong> {o.amount}</p>
                    <p><strong>Status:</strong> 
                      <span className={`status-badge ${
                        o.status === "Confirmed"
                          ? "delivered"
                          : o.status === "Draft"
                          ? "shipped"
                          : o.status === "Closed"
                          ? "delivered"
                          : "not-shipped"
                      }`}>
                        {o.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pagination">
        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          &laquo;
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
          &raquo;
        </button>
      </div>

      {/* Add Order Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="small-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingOrder ? 'Edit Order' : 'Add Order'}</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Order Number</label>
                  <input
                    type="text"
                    name="orderNo"
                    value={formData.orderNo}
                    onChange={handleInputChange}
                    placeholder="Enter order number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    placeholder="Enter customer name"
                    disabled={editingOrder !== null}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Void">Void</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Invoiced Amount</label>
                  <input
                    type="text"
                    name="invoiced"
                    value={formData.invoiced}
                    onChange={handleInputChange}
                    placeholder="₹0.00"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Total Amount</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="₹0.00"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Product</label>
                  <select
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.name}>
                        {product.name} (₹{product.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Packed Date</label>
                  <input
                    type="date"
                    name="packed"
                    value={formData.packed}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Shipped Date</label>
                  <input
                    type="date"
                    name="shipped"
                    value={formData.shipped}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                  <CloseIcon />
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <SaveIcon />
                  {editingOrder ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;