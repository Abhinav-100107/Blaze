import './PostLoginSplash.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonBackground from './NeonBackground';

const MESSAGES = [
  'Initializing System...',
  'Fetching Sensor Data...',
  'Calibrating Detectors...',
  'Preparing Dashboard...',
];

function PostLoginSplash() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Cycle through messages every 600ms
    const msgTimer = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length);
    }, 600);

    // Smoothly increment progress bar over 2.4s
    const progressTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressTimer); return 100; }
        return p + 2;
      });
    }, 48);

    // Start fade-out at 2.6s, navigate at 3s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2600);
    const navTimer = setTimeout(() => navigate('/dashboard'), 3000);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`pls-screen ${fadeOut ? 'pls-fade-out' : ''}`}>
      <NeonBackground />
      <div className="pls-particles">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="pls-particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="pls-content">
        <div className="pls-logo-wrap">
          <div className="pls-ring pls-ring-1" />
          <div className="pls-ring pls-ring-2" />
          <img src="/logo.png" alt="BlazeBot" className="pls-logo" />
        </div>

        <h1 className="pls-title">BlazeBot</h1>
        <p className="pls-subtitle">Fire Detection System</p>

        <div className="pls-progress-wrap">
          <div className="pls-progress-bar">
            <div className="pls-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="pls-percent">{progress}%</span>
        </div>

        <p className="pls-msg">{MESSAGES[msgIndex]}</p>
      </div>
    </div>
  );
}

export default PostLoginSplash;
