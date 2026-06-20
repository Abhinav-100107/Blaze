import './Splash.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonBackground from './NeonBackground';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem('blazebot_logged_in') === 'true' ||
      sessionStorage.getItem('blazebot_logged_in') === 'true';

    const timer = setTimeout(() => {
      navigate(isLoggedIn ? '/dashboard' : '/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <NeonBackground />
      <div className="splash-content">
        <div className="splash-logo">
          <img src="/logo.png" alt="BlazeBot" />
        </div>
        <h1 className="splash-title">BlazeBot</h1>
        <p className="splash-tagline">Fire Detection System</p>
        <div className="splash-loader">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      </div>
    </div>
  );
}

export default Splash;
