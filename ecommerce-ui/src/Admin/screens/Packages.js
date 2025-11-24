import React, { useState, useEffect } from "react";
import { FaSearch, FaEnvelope, FaBell, FaCalendarAlt, FaEdit, FaCloudDownloadAlt, FaTrashAlt, FaTimes } from 'react-icons/fa';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddPackageForm from './AddPackageForm';
import "../css/SuppliersPage.css";
import "../css/Packages.css";
import "../css/AdminModal.css";

const Packages = () => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    customerName: "",
    packageId: "",
    date: "",
    status: "",
    
  });
  const [editingPackage, setEditingPackage] = useState(null);
  const [packages, setPackages] = useState([
    {
      id: 22210,
      date: "22 Feb 2020",
      customer: "Mayme Miller",
      status: "Delivered",
    },
    {
      id: 66526,
      date: "25 Nov 2020",
      customer: "Charlie Larson",
      status: "Shipped",
    },
    {
      id: 46397,
      date: "24 Nov 2020",
      customer: "Jackson Gonzales",
      status: "Delivered",
    },
    {
      id: 22696,
      date: "10 Sep 2020",
      customer: "Lawrence Meyer",
      status: "Not shipped",
    },
    {
      id: 37016,
      date: "19 May 2020",
      customer: "Betty Hicks",
      status: "Not shipped",
    },
    {
      id: 20337,
      date: "15 Aug 2020",
      customer: "Elsie Garrett",
      status: "Delivered",
    },
    {
      id: 13182,
      date: "01 Sep 2020",
      customer: "Sylvia Bridges",
      status: "Delivered",
    },
    {
      id: 77900,
      date: "13 Aug 2020",
      customer: "Irene Nichols",
      status: "Not shipped",
    },
    {
      id: 31028,
      date: "11 Mar 2020",
      customer: "Sylvia Tucker",
      status: "Delivered",
    },
    {
      id: 31933,
      date: "25 Aug 2020",
      customer: "Anthony Ortiz",
      status: "Shipped",
    },
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const packageData = {
      ...formData,
      weight: parseFloat(formData.weight),
      price: parseFloat(formData.price)
    };

    if (editingPackage) {
      setPackages(prev => prev.map(p => 
        p.id === editingPackage.id ? { ...p, ...packageData } : p
      ));
    } else {
      const newPackage = {
        id: Math.floor(Math.random() * 90000) + 10000,
        date: formData.date ? new Date(formData.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) : new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        customer: formData.customerName,
        status: formData.status || "Not shipped",
        ...packageData
      };
      setPackages([...packages, newPackage]);
    }
    setFormData({
      packageName: "",
      description: "",
      weight: "",
      price: "",
      category: ""
    });
    setShowForm(false);
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setFormData({
      customerName: "",
      packageId: "",
      date: "",
      status: "",
      description: "",
      weight: "",
      price: "",
      category: ""
    });
    setShowForm(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      customerName: pkg.customer,
      packageId: pkg.id?.toString() || "",
      date: pkg.date ? new Date(pkg.date).toISOString().split('T')[0] : "",
      status: pkg.status || "",
      description: pkg.description || "",
      weight: pkg.weight?.toString() || "",
      price: pkg.price?.toString() || "",
      category: pkg.category || ""
    });
    setShowForm(true);
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.customer
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filterByDate = (date) => {
    if (!date) {
      setSelectedDate('');
      setCurrentPage(1);
      setShowCalendar(false);
      return;
    }
    setSelectedDate(date);
    setCurrentPage(1);
    setShowCalendar(false);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (day, month, year) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day.toString().padStart(2, '0')} ${months[month]} ${year}`;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(day, currentMonth, currentYear);
      const hasPackage = packages.some(pkg => pkg.date === dateStr);
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${hasPackage ? 'has-package' : ''} ${selectedDate === dateStr ? 'selected' : ''}`}
          onClick={() => filterByDate(dateStr)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  return (
    <div className="admin packages-container">


      {/* Filter Section */}
      <div className="content-wrapper">
      <div className="filter-section">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Delivered">Delivered</option>
              <option value="Shipped">Shipped</option>
              <option value="Not shipped">Not shipped</option>
            </select>
          </div>

          <div className="calendar-container">
            <div className="calendar-circle" onClick={() => setShowCalendar(!showCalendar)}>
              <FaCalendarAlt />
            </div>
            {showCalendar && (
              <div className="calendar-popup" onClick={(e) => e.stopPropagation()}>
                <div className="calendar-header">
                  <button className="calendar-nav" onClick={() => navigateMonth('prev')}>‹</button>
                  <div className="calendar-title">
                    <span 
                      className="month-selector" 
                      onClick={() => setShowMonthPicker(!showMonthPicker)}
                    >
                      {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long' })}
                    </span>
                    <span 
                      className="year-selector" 
                      onClick={() => setShowYearPicker(!showYearPicker)}
                    >
                      {currentYear}
                    </span>
                  </div>
                  <button className="calendar-nav" onClick={() => navigateMonth('next')}>›</button>
                </div>
                {showMonthPicker && (
                  <div className="month-picker">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                      <div 
                        key={month} 
                        className={`month-option ${currentMonth === index ? 'active' : ''}`}
                        onClick={() => {
                          setCurrentMonth(index);
                          setShowMonthPicker(false);
                        }}
                      >
                        {month}
                      </div>
                    ))}
                  </div>
                )}
                {showYearPicker && (
                  <div className="year-picker">
                    {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                      <div 
                        key={year} 
                        className={`year-option ${currentYear === year ? 'active' : ''}`}
                        onClick={() => {
                          setCurrentYear(year);
                          setShowYearPicker(false);
                        }}
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                )}
                <div className="calendar-grid">
                  <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                  {renderCalendarDays()}
                </div>
                <div className="calendar-footer">
                  <button className="calendar-clear" onClick={() => filterByDate('')}>
                    Show All
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="add-packages-btn" onClick={handleAdd}>+ Add Package</button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="packages-table-container">
          <table className="packages-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPackages.map((pkg) => (
                <tr key={pkg.id} className="table-row">
                  <td className="package-id">{pkg.id}</td>
                  <td>{pkg.date}</td>
                  <td className="package-name">{pkg.customer}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        pkg.status === "Delivered"
                          ? "delivered"
                          : pkg.status === "Shipped"
                          ? "shipped"
                          : "not-shipped"
                      }`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit-btn" onClick={() => handleEdit(pkg)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="action-btn download-btn" title="Download">
                        <FaCloudDownloadAlt />
                      </button>
                      <button className="action-btn delete-btn" title="Delete">
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
            {currentPackages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="card-header">
                  <h3>{pkg.customer}</h3>
                  <div className="card-actions">
                    <button className="action-btn edit-btn" onClick={() => handleEdit(pkg)} title="Edit">
                      <FaEdit />
                    </button>
                    <button className="action-btn download-btn" title="Download">
                      <FaCloudDownloadAlt />
                    </button>
                    <button className="action-btn delete-btn" title="Delete">
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p><strong>ID:</strong> {pkg.id}</p>
                  <p><strong>Date:</strong> {pkg.date}</p>
                  <p><strong>Status:</strong> 
                    <span className={`status-badge ${
                      pkg.status === "Delivered"
                        ? "delivered"
                        : pkg.status === "Shipped"
                        ? "shipped"
                        : "not-shipped"
                    }`}>
                      {pkg.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>

      {/* Pagination */}
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

      {/* Add Package Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
            <AddPackageForm 
              onClose={() => setShowForm(false)} 
              onSubmit={handleFormSubmit}
              editingPackage={editingPackage}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
