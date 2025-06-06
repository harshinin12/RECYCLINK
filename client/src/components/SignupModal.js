import React, { useState } from 'react';

function SignupModal({ show, onClose, onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Signup failed');
      onSignupSuccess(data);
      setUsername('');
      setPassword('');
      setEmail('');
      setAddress('');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
        <h3>Signup</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Home Address</label>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%' }} />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button type="button" onClick={onClose} style={{ marginRight: '1rem' }}>Close</button>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default SignupModal; 