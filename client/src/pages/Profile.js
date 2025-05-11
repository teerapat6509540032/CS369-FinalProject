import React from 'react';

const Profile = () => {
    return (

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

    );
};
export default Profile;