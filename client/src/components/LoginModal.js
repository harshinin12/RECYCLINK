import React, { useState } from 'react';
import Toast from './common/Toast';

function LoginModal({ show, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      // Show success message
      setToastMessage('Successfully logged in!');
      setShowToast(true);
      
      // Wait for toast to be visible before closing modal
      setTimeout(() => {
        onLoginSuccess(data);
        setEmail('');
        setPassword('');
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%' }} />
            </div>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <button type="button" onClick={onClose} style={{ marginRight: '1rem' }}>Close</button>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginModal; 