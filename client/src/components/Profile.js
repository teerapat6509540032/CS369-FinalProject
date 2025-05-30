import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/account/profileDetail', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          setOriginalProfile(data);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setOriginalProfile(profile); // เก็บค่าเดิมไว้สำหรับกรณียกเลิก
    setEditMode(true);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditMode(false);
  };

  const handleChange = (e) => {
     const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  };

  const handleSave = async () => {
    if (window.confirm('Are you sure you want to save changes?')) {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/account/updateProfile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          setEditMode(false);
        } else {
          alert('Failed to update profile');
        }
      } catch (err) {
        alert('Error updating profile');
      }
    }
    // ถ้ายกเลิกใน confirm จะไม่ทำอะไร
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="account-details">
      <div className="account-section">
        <h2>Profile Details</h2>

        <div className="account-item">
          <label>Full Name</label>
          <div className="editable-field">
            {editMode ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>
        </div>

        <div className="account-item">
          <label>Username</label>
          <div className="editable-field">
            <p>{profile.username}</p>
          </div>
        </div>

        <div className="account-item">
          <label>Email</label>
          <div className="editable-field">
            {editMode ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>
        </div>

        <div className="account-item">
          <label>Password</label>
          <div className="editable-field">
            <p>••••••••</p>
          </div>
        </div>

        <div className="account-item">
          <label>Shipping Address</label>
          <div className="editable-field">
            {editMode ? (
              <input
                type="text"
                name="shippingAddress"
                value={profile.shippingAddress}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.shippingAddress || '-'}</p>
            )}
          </div>
        </div>
      </div>

      {editMode ? (
        <div className="account-actions">
          <button className="btn btn-blue" onClick={handleSave}>Save Changes</button>
          <button className="btn btn-red" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="account-actions">
          <button className="btn btn-blue" onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;