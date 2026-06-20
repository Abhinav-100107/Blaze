import './Profile.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NeonBackground from './NeonBackground';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine where user came from (default to dashboard)
  const previousPage = location.state?.from || '/';
  const isLight = localStorage.getItem('blazebot_theme') === 'light';
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Abhinav Saxena',
    userId: 'BB-2024-001',
    email: 'abhinav@blazebot.com',
    phone: '+91 8532***344',
    dob: '15/08/2000',
    address: 'Mathura, Uttar Pradesh, India'
  });

  const [editedData, setEditedData] = useState({ ...profileData });

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setProfileData({ ...editedData });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedData({ ...profileData });
    setIsEditing(false);
  };

  return (
    <div className={`profile-page ${isLight ? 'light' : ''}`}>
      {!isLight && <NeonBackground />}
      {isLight && <NeonBackground light />}
      {/* Header */}
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate(previousPage)}>
          ← Back
        </button>
        <h1 className="profile-title">👤 My Profile</h1>
        <div className="header-branding" onClick={() => navigate('/dashboard')}>
          <img src="/logo.png" alt="BlazeBot" className="header-logo" />
          <span className="header-brand-name">BlazeBot</span>
          {!isEditing ? (
            <button className="edit-btn" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="edit-actions" onClick={e => e.stopPropagation()}>
              <button className="save-btn" onClick={handleSave}>✓ Save</button>
              <button className="cancel-btn" onClick={handleCancel}>✕ Cancel</button>
            </div>
          )}
        </div>
      </header>

      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-main-card">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="profile-avatar-large">👤</div>
            <button className="change-avatar-btn">
              📷 Change Photo
            </button>
          </div>

          {/* Profile Information */}
          <div className="profile-details">
            <div className="detail-row">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.name}</p>
              )}
            </div>

            <div className="detail-row">
              <label>User ID</label>
              <p className="user-id">{profileData.userId}</p>
            </div>

            <div className="detail-row">
              <label>Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.email}</p>
              )}
            </div>

            <div className="detail-row">
              <label>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editedData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.phone}</p>
              )}
            </div>

            <div className="detail-row">
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="text"
                  name="dob"
                  value={editedData.dob}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.dob}</p>
              )}
            </div>

            <div className="detail-row">
              <label>Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={editedData.address}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.address}</p>
              )}
            </div>
          </div>

          {/* Last Updated Info */}
          <div className="last-updated-info">
            <p>Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="info-cards-grid">
          <div className="info-card">
            <div className="info-icon">📊</div>
            <h3>Account Status</h3>
            <p className="status-active">Active</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🔐</div>
            <h3>Security</h3>
            <p>2FA Enabled</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📅</div>
            <h3>Member Since</h3>
            <p>April 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;