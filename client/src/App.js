import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Facilities from './pages/Facilities';
import Profile from './pages/Profile';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Blogs from './pages/Blogs';
import ContactUs from './pages/ContactUs';
import Chatbot from './components/Chatbot';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  console.log('Current user:', user);

  const handleLoginSuccess = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  const handleSignupSuccess = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
  };

  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img  src = "/images/blogs/recyclinklogo.png" style={{ height: '50px', width: 'auto' }} ></img>
          <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
          <Link to="/facilities" style={{ margin: '0 1rem' }}>E-waste Facilities</Link>
          <Link to="/blogs" style={{ margin: '0 1rem' }}>Blogs</Link>
          <Link to="/contactus" style={{ margin: '0 1rem' }}>Contact Us</Link>
          <Link
            to="/"
            onClick={e => {
              e.preventDefault();
              window.location.hash = "#about";
              setTimeout(() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            style={{ margin: '0 1rem', cursor: 'pointer' }}
          >
            About
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ margin: '0 1rem' }}>
                Hello, <b>{user.name || user.email || 'User'}</b>
              </span>
              <button onClick={handleLogout} style={{ margin: '0 1rem' }}>Logout</button>
              <Link to="/profile" style={{ margin: '0 1rem' }}>Profile</Link>
            </>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)} style={{ margin: '0 1rem' }}>Login</button>
              <button onClick={() => setShowSignup(true)} style={{ margin: '0 1rem' }}>Signup</button>
              <Link to="/profile" style={{ margin: '0 1rem' }}>Profile</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/profile" element={<Profile user={user} token={token} />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
      <SignupModal show={showSignup} onClose={() => setShowSignup(false)} onSignupSuccess={handleSignupSuccess} />
      <Chatbot />
    </Router>
  );
  
}
export default App; 