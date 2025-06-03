import React, { useState } from 'react';
import Profile from '../components/Profile';
import OrderHistory from '../components/OrderHistory';
import SavedDesigns from '../components/SavedDesigns';
import '../css/Account.css'; 
import '../css/OrderHistory.css';
const Account = () => {
  const [activeSection, setActiveSection] = useState('Profile Details'); // Default to Profile Details

  const handleNavClick = (section, e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setActiveSection(section); // Set the active section
  };

  // Render the content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'Profile Details':
        return <Profile />;
      case 'Order History':
        return <OrderHistory />;
      case 'Saved Designs':
        return <SavedDesigns />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="header-page">
      <h1>My Account</h1>
      <p className="description">
        Manage your account details, view your past orders, and update your preferences.
      </p>

      <div className="account-container">
        <div className="account-sidebar">
          <div className="account-photo">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="account-nav">
            <a
              href="#"
              className={`account-nav-item ${activeSection === 'Profile Details' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('Profile Details', e)}
            >
              Profile Details
            </a>
            <a
              href="#"
              className={`account-nav-item ${activeSection === 'Order History' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('Order History', e)}
            >
              Order History
            </a>
            <a
              href="#"
              className={`account-nav-item ${activeSection === 'Saved Designs' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('Saved Designs', e)}
            >
              Saved Designs
            </a>
            
          </div>
        </div>
        <div className="account-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Account;