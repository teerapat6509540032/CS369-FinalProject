import React from 'react';

const Account = () => {
  return (
    
      <div className="header-page">
        <h1>My Account</h1>
        <p className="description">
          Manage your account details, view your past orders, and update your preferences.
        </p>

        <div className="account-container">
          <div className="account-sidebar">
            <div className="account-photo">
              <img src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png" alt="Profile" className="profile-image" />
              <button className="btn btn-small">Change</button>
            </div>
            <div className="account-nav">
              <a href="#" className="account-nav-item active">Profile Details</a>
              <a href="#" className="account-nav-item">Order History</a>
              <a href="#" className="account-nav-item">Saved Designs</a>
            </div>
          </div>

          <div className="account-details">
            <div className="account-section">
              <h2>Profile Details</h2>
              
              <div className="account-item">
                <label>Full Name</label>
                <div className="editable-field">
                  <p>John Doe</p>
                  <button className="edit-btn">Edit</button>
                </div>
              </div>

              <div className="account-item">
                <label>Username</label>
                <div className="editable-field">
                  <p>JohnDoe</p>
                  <button className="edit-btn">Edit</button>
                </div>
              </div>

              <div className="account-item">
                <label>Email</label>
                <div className="editable-field">
                  <p>johndoe@example.com</p>
                  <button className="edit-btn">Edit</button>
                </div>
              </div>

              <div className="account-item">
                <label>Password</label>
                <div className="editable-field">
                  <p>••••••••</p>
                  <button className="edit-btn">Change</button>
                </div>
              </div>

              <div className="account-item">
                <label>Shipping Address</label>
                <div className="editable-field">
                  <p>123 Main St, Anytown, USA 12345</p>
                  <button className="edit-btn">Edit</button>
                </div>
              </div>
            </div>

            <div className="account-actions">
              <button className="btn btn-blue">Save Changes</button>
              <button className="btn btn-danger">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    
  );
};
export default Account;
