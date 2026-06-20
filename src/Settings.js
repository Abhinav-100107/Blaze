import './Settings.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonBackground from './NeonBackground';

function Settings() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('blazebot_theme') !== 'light'
  );
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleThemeToggle = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('blazebot_theme', next ? 'dark' : 'light');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendMessage = () => {
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('blazebot_logged_in');
      sessionStorage.removeItem('blazebot_logged_in');
      navigate('/login');
    }
  };

  return (
    <div className={`settings-page ${isDarkMode ? 'dark' : 'light'}`}>
      {isDarkMode && <NeonBackground />}
      {!isDarkMode && <NeonBackground light />}
      {/* Header */}
      <header className="settings-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <h1 className="settings-title">⚙️ Settings</h1>
        <div className="header-branding" onClick={() => navigate('/dashboard')}>
          <img src="/logo.png" alt="BlazeBot" className="header-logo" />
          <span className="header-brand-name">BlazeBot</span>
        </div>
      </header>

      <div className="settings-container">
        {/* Profile Section */}
<div className="settings-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile', { state: { from: '/settings' } })}>
  <div className="card-header">
    <span className="card-icon">👤</span>
    <h2>Profile</h2>
  </div>
  <div className="profile-section">
    <div className="profile-avatar">👤</div>
    <div className="profile-info">
      <p><strong>Name:</strong> Abhinav Saxena</p>
      <p><strong>User ID:</strong> BB-2024-001</p>
      <p><strong>Email:</strong> abhinav@blazebot.com</p>
      <p><strong>Date of Birth:</strong> 15/08/2000</p>
    </div>
  </div>
  <p style={{ textAlign: 'center', marginTop: '15px', color: '#ff6b35' }}>Click to view full profile →</p>
</div>

        {/* Theme Settings */}
        <div className="settings-card">
          <div className="card-header">
            <span className="card-icon">{isDarkMode ? '🌙' : '☀️'}</span>
            <h2>Theme Settings</h2>
          </div>
          <div className="theme-toggle">
            <span>Dark Mode</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isDarkMode} 
                onChange={handleThemeToggle}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Contact Us */}
        <div className="settings-card">
          <div className="card-header">
            <span className="card-icon">📧</span>
            <h2>Contact Us</h2>
          </div>
          <div className="contact-info">
            <p>📧 <strong>Email:</strong> Blaze.Bot@gmail.com</p>
            <p>📞 <strong>Phone:</strong> +91 8532***344</p>
          </div>
          
          <div className="contact-form">
            <h3>Send us a message</h3>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleInputChange}
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleInputChange}
            />
            <textarea 
              name="message"
              placeholder="Your message, query, or feedback..."
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            <button className="send-btn" onClick={handleSendMessage}>
              Send Message ✉️
            </button>
          </div>
          
          <div className="team-info">
            <p><strong>Development Team:</strong></p>
            <p>• Abhinav Saxena</p>
            <p>• Dheer Prashant Singh</p>
            <p>• Nikhil Sharma</p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="settings-card">
          <div className="card-header">
            <span className="card-icon">📋</span>
            <h2>Terms and Conditions</h2>
          </div>
          <button 
            className="view-terms-btn" 
            onClick={() => setShowTerms(!showTerms)}
          >
            {showTerms ? 'Hide Terms' : 'View Terms'}
          </button>
          
          {showTerms && (
            <div className="terms-content">
              <p>
                By using the BlazeBot Fire Detection System, you agree to use the platform 
                solely for monitoring and safety purposes. BlazeBot provides real-time sensor 
                data including temperature and smoke levels; however, it does not guarantee 
                absolute accuracy or prevention of fire-related incidents.
              </p>
              <p>
                Users are responsible for ensuring proper installation, maintenance, and 
                response to alerts generated by the system. BlazeBot shall not be held liable 
                for any direct or indirect damages, losses, or incidents resulting from system 
                errors, delays, or misuse.
              </p>
              <p>
                User data and system activity may be collected to improve performance and 
                security, in accordance with our privacy practices. Unauthorized access, 
                tampering, or misuse of the system is strictly prohibited.
              </p>
              <p>
                <strong>Continued use of the platform indicates acceptance of these terms.</strong>
              </p>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="settings-card logout-card">
          <div className="card-header">
            <span className="card-icon">🚪</span>
            <h2>Logout</h2>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout 🔓
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;