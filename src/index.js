import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CursorGlow from './CursorGlow';
import Splash from './Splash';
import Login from './Login';
import PostLoginSplash from './PostLoginSplash';
import Settings from './Settings';
import Profile from './Profile';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const isLoggedIn = () =>
  localStorage.getItem('blazebot_logged_in') === 'true' ||
  sessionStorage.getItem('blazebot_logged_in') === 'true';

const ProtectedRoute = ({ children }) =>
  isLoggedIn() ? children : <Navigate to="/login" replace />;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CursorGlow />
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loading" element={<ProtectedRoute><PostLoginSplash /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><App /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
);
