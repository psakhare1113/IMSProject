import '../css/MainAdmin.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import OutputIcon from '@mui/icons-material/Output';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import logo from '../images/logo.png';
import Dashboardli from './Dashboardli';
import Contacts from './Contacts';
import ContactDetails from './ContactDetails';
import CustomersPage from './CustomersPage';
import ProductList from './ProductList';
import Packages from './Packages';
import AllOrders from './AllOrders';
import Invoices from './Invoices';
import Shipping from './Shipping';
import SuppliersPage from './SuppliersPage';
import OutgoingProducts from './OutgoingProducts';
import Reports from './Reports';
import CategoryList from './CategoryList';
import Setting from './Setting';



const initialAdminData = [
  {
    id: 1,
    name: 'John Admin',
    role: 'Super Admin',
    email: 'john@admin.com',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Sarah Manager',
    role: 'Manager',
    email: 'sarah@admin.com',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Mike Staff',
    role: 'Staff',
    email: 'mike@admin.com',
    status: 'Inactive'
  }
];

const sidebarItems = [
  { icon: <DashboardIcon />, label: 'Dashboard', active: false },
  { icon: <ContactsIcon />, label: 'Contacts', active: false },
  { icon: <PeopleIcon />, label: 'Customers', active: false },
  { icon: <FolderIcon />, label: 'Products', active: false },
  { icon: <FolderIcon />, label: 'Categories', active: false },
  { icon: <ShoppingCartIcon />, label: 'Orders', active: false },
  { icon: <OutputIcon />, label: 'Packages', active: false },
  { icon: <ReceiptIcon />, label: 'Invoice', active: false },
  { icon: <LocalShippingIcon />, label: 'Shipping', active: false },
  { icon: <BusinessIcon />, label: 'Suppliers', active: false },
  { icon: <InventoryIcon />, label: 'Outgoing Products', active: false },
  { icon: <AssessmentIcon />, label: 'Reports', active: false },
  { icon: <SettingsIcon />, label: 'Settings', active: false }
];

export default function MainAdmin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(initialAdminData);
  
  // Check authentication on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  const [menuData, setMenuData] = useState(null);
  const [contacts, setContacts] = useState([]);

  const handleMenuChange = (menu, data = null) => {
    setSelectedMenu(menu);
    setMenuData(data);
  };
  
  const filteredData = adminData.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="admin inventory-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="main-layout" style={{ display: 'flex', flex: 1 }}>
        <div className="sidebar" style={{ backgroundColor: 'white' }}>
          <div className="inventory-system-header" style={{ backgroundColor: 'white', borderBottom: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '80px', paddingRight: '80px' }}>
              <img src={logo} alt="Logo" style={{ width: '30px', height: '30px' }} />
            </div>
          </div>

          <div className="admin-profile" style={{ backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '10px', borderBottom: 'none' }}>
            <div className="profile-avatar" style={{ marginBottom: '3px' }}>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" alt="Admin" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </div>
            <div className="profile-info">
              <div className="profile-name" style={{ color: 'black', marginBottom: '1px' }}>Hello! Admin</div>
              <div className="profile-email" style={{ fontSize: '12px', color: '#999', filter: 'blur(0.5px)' }}>pooja.admin@example.com</div>
            </div>
          </div>

          <nav className="sidebar-nav" style={{ paddingTop: '5px' }}>
            {sidebarItems.map((item, index) => (
              <div key={index} className={`nav-item ${selectedMenu === item.label ? 'active' : ''}`} style={{ padding: '8px 15px', fontSize: '13px', cursor: 'pointer', color: selectedMenu === item.label ? 'black' : '#999', display: 'flex', alignItems: 'center', minHeight: '35px' }} onClick={() => setSelectedMenu(item.label)}>
                <span className="nav-icon" style={{ fontSize: '14px', marginRight: '8px', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                <span className="nav-label" style={{ display: 'flex', alignItems: 'center' }}>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="main-content">
          <div className="red-top-bar" style={{ backgroundColor: 'white', justifyContent: 'space-between' }}>
            <div style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>{selectedMenu === 'Dashboard' ? 'Overview of Dashboard' : selectedMenu}</div>
            <div className="admin-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '30px', height: '30px', backgroundColor: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SearchIcon style={{ fontSize: '16px', color: '#666' }} />
              </div>
              <div style={{ width: '30px', height: '30px', backgroundColor: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageIcon style={{ fontSize: '16px', color: '#666' }} />
              </div>
              <div style={{ width: '30px', height: '30px', backgroundColor: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NotificationsIcon style={{ fontSize: '16px', color: '#666' }} />
              </div>
            </div>
          </div>

          <div className="content-area" style={{ margin: '0', padding: '0', background: 'linear-gradient(135deg, #f5f7fa 0%, #cfd8e6 100%)', minHeight: '100vh' }}>
            {selectedMenu === 'Dashboard' && <Dashboardli />}
            {selectedMenu === 'Contacts' && <Contacts setActiveMenu={handleMenuChange} />}
            {selectedMenu === 'ContactDetails' && <ContactDetails contactId={menuData?.contactId} contacts={menuData?.contacts} setActiveMenu={handleMenuChange} />}
            {selectedMenu === 'Customers' && <CustomersPage />}
            {selectedMenu === 'Products' && <ProductList />}
            {selectedMenu === 'Categories' && <CategoryList />}
            {selectedMenu === 'Orders' && <AllOrders />}
            {selectedMenu === 'Packages' && <Packages />}
            {selectedMenu === 'Invoice' && <Invoices />}
            {selectedMenu === 'Shipping' && <Shipping />}
            {selectedMenu === 'Suppliers' && <SuppliersPage />}
            {selectedMenu === 'Outgoing Products' && <OutgoingProducts />}
            {selectedMenu === 'Reports' && <Reports />}
            {selectedMenu === 'Settings' && <Setting />}

          </div>
        </div>
      </div>
    </div>
  );
}