import './App.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonBackground from './NeonBackground';

function App() {
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState(0);
  const [smokeLevel, setSmokeLevel] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [flame, setFlame] = useState(1);
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [fireStatus, setFireStatus] = useState('SAFE');
  const isLight = localStorage.getItem('blazebot_theme') === 'light';
  const buzzerRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    console.log('🔌 Attempting to connect to WebSocket...');
    const ws = new WebSocket('ws://localhost:5001');

    ws.onopen = () => {
      console.log('✅ WebSocket connected!');
      setIsOnline(true);
    };

    ws.onmessage = (event) => {
      console.log('📡 Received data:', event.data);
      const data = JSON.parse(event.data);
      console.log('📊 Parsed:', data);
      setTemperature(data.temperature);
      setSmokeLevel(data.smoke);
      setHumidity(data.humidity);
      setFlame(data.flame);
      setFireStatus(data.status);
      setLastUpdated(new Date(data.timestamp));
      setIsOnline(data.status !== 'OFFLINE');
    };

    ws.onclose = () => {
      console.log('❌ WebSocket disconnected');
      setIsOnline(false);
    };
    
    ws.onerror = (error) => {
      console.error('⚠️ WebSocket error:', error);
      setIsOnline(false);
    };

    return () => {
      console.log('🔌 Closing WebSocket connection');
      ws.close();
    };
  }, []);

  const isTempDanger = temperature > 45 || fireStatus === 'FIRE';
  const isSmokeDanger = smokeLevel > 300 || fireStatus === 'FIRE';
  const isFlameDanger = flame === 0 || fireStatus === 'FIRE';

  // Buzzer sound effect when flame detected
  useEffect(() => {
    if (isFlameDanger) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      
      const playBuzzer = () => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.2);
      };
      
      playBuzzer();
      buzzerRef.current = setInterval(playBuzzer, 500);
      
      return () => {
        if (buzzerRef.current) clearInterval(buzzerRef.current);
      };
    } else {
      if (buzzerRef.current) {
        clearInterval(buzzerRef.current);
        buzzerRef.current = null;
      }
    }
  }, [isFlameDanger]);

  return (
    <div className={`App ${isLight ? 'light' : ''}`}>
      {!isLight && <NeonBackground />}
      {isLight && <NeonBackground light />}
      {/* Top Bar */}
      <header className="top-bar">
        <div className="branding">
          <div className="logo">
            <img src="/logo.png" alt="BlazeBot Logo" />
          </div>
          <h1 className="app-name">BlazeBot</h1>
        </div>
        
        <div className="status-indicator">
          <span className="status-label">Status:</span>
          <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '● Online' : '● Offline'}
          </span>
        </div>

        <div className="user-section">
          <div className="settings-icon" onClick={() => navigate('/settings')}>⚙️</div>
          <div className="user-profile" onClick={() => navigate('/profile', { state: { from: '/dashboard' } })}>👤</div>
          <div className="logout-btn" onClick={() => {
            localStorage.removeItem('blazebot_logged_in');
            sessionStorage.removeItem('blazebot_logged_in');
            navigate('/login');
          }}>🚪</div>
        </div>
      </header>

      {/* Main Monitoring Section */}
      <main className="monitoring-section">
        <h2 className="section-title">Real-Time Monitoring</h2>
        
        <div className="sensor-grid">
          {/* Temperature Card */}
          <div className={`sensor-card ${isTempDanger ? 'danger' : 'safe'}`}>
            <div className="sensor-icon">🌡️</div>
            <div className="sensor-label">Temperature</div>
            <div className={`sensor-value ${isTempDanger ? 'alert' : ''}`}>
              {temperature}°C
            </div>
            <div className="threshold-info">Threshold: 45°C</div>
            {isTempDanger && <div className="alert-icon">⚠️</div>}
          </div>

          {/* Smoke Level Card */}
          <div className={`sensor-card ${isSmokeDanger ? 'danger' : 'safe'}`}>
            <div className="sensor-icon">💨</div>
            <div className="sensor-label">Smoke Level</div>
            <div className={`sensor-value ${isSmokeDanger ? 'alert' : ''}`}>
              {smokeLevel}
            </div>
            <div className="threshold-info">Threshold: 300</div>
            {isSmokeDanger && <div className="alert-icon">⚠️</div>}
          </div>

          {/* Flame Sensor Card */}
          <div className={`sensor-card ${isFlameDanger ? 'danger' : 'safe'}`}>
            <div className="sensor-icon">🔥</div>
            <div className="sensor-label">Flame Sensor</div>
            <div className={`sensor-value ${isFlameDanger ? 'alert' : ''}`}>
              {flame === 0 ? 'DETECTED' : 'CLEAR'}
            </div>
            <div className="threshold-info">0 = Flame Present</div>
            {isFlameDanger && <div className="alert-icon">⚠️</div>}
          </div>

          {/* Humidity Card */}
          <div className="sensor-card safe">
            <div className="sensor-icon">💧</div>
            <div className="sensor-label">Humidity</div>
            <div className="sensor-value">
              {humidity}%
            </div>
            <div className="threshold-info">Ambient Reading</div>
          </div>
        </div>

        <div className="last-updated">
          Last Updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </main>
    </div>
  );
}

export default App;