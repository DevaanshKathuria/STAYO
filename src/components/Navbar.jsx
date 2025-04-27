import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Navbar.css';

function Navbar() {
  const { user = null, login, logout } = useUser() || {};
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const loginModalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (loginModalRef.current && !loginModalRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.name) {
      alert('Please fill in all required fields');
      return;
    }
    login(loginData.email, loginData.password, loginData.name);
    setIsLoginOpen(false);
    setLoginData({ email: '', password: '', name: '' });
  };
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1 style={{color: "#ff0000"}}>STAYO</h1>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/hotels" className={location.pathname === '/hotels' ? 'active' : ''}>Hotels</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        <Link to="/support" className={location.pathname === '/support' ? 'active' : ''}>Support</Link>
        {user && typeof user === 'object' ? (
          <div className="user-profile" ref={profileRef}>
            <button 
              className={`profile-button ${isProfileOpen ? 'active' : ''}`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <span>{user?.name || user?.email || 'User'}</span>
              <span className="profile-icon">👤</span>
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <span className="avatar-large">👤</span>
                  <div className="user-info">
                    <span>{user?.name || 'User'}</span>
                    <span>{user?.email || ''}</span>
                  </div>
                </div>
                <Link to="/my-bookings" onClick={() => setIsProfileOpen(false)}>
                  <span role="img" aria-label="bookings"></span> My Bookings
                </Link>
                <Link to="/settings" onClick={() => setIsProfileOpen(false)}>
                  <span role="img" aria-label="settings"></span> Settings
                </Link>
                <button onClick={handleLogout}>
                  <span role="img" aria-label="logout"></span> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            className={`login-btn ${isLoginOpen ? 'active' : ''}`}
            onClick={() => setIsLoginOpen(true)}
          >
            Login
          </button>
        )}
      </div>
      {isLoginOpen && (
        <div className="login-modal">
          <div className="login-content" ref={loginModalRef}>
            <h2>Welcome to STAYO</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={loginData.name}
                  onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="login-submit">Login</button>
            </form>
            <button 
              className="close-btn" 
              onClick={() => {
                setIsLoginOpen(false);
                setLoginData({ name: '', email: '', password: '' });
              }}
              aria-label="Close login modal"
            >
            </button>
          </div>
          <div className="login-overlay" onClick={() => setIsLoginOpen(false)} />
        </div>
      )}
    </nav>
  );
}
export default Navbar;
