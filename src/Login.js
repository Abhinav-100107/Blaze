import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonBackground from './NeonBackground';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      if (form.remember) localStorage.setItem('blazebot_logged_in', 'true');
      else sessionStorage.setItem('blazebot_logged_in', 'true');
      setLoading(false);
      navigate('/loading');
    }, 1500);
  };

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="login-page">
      <NeonBackground />
      <div className="login-card">
        <div className="login-logo">
          <img src="/logo.png" alt="BlazeBot" />
        </div>
        <h1 className="login-title">BlazeBot</h1>
        <p className="login-subtitle">Fire Detection System</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <input
              className={`login-input ${errors.email ? 'input-error' : ''}`}
              type="email"
              name="email"
              placeholder="Email / Username"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="field-group">
            <input
              className={`login-input ${errors.password ? 'input-error' : ''}`}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className="login-options">
            <label className="remember-label">
              <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
              Remember me
            </label>
            <span className="forgot-link">Forgot Password?</span>
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
