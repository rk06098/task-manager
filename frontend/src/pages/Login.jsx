import React, { useState } from 'react';

export default function Login({ login, setIsRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      return setError('All fields are required.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return setError('Please enter a valid email address.');
    }

    try {
      const res = await fetch('https://task-manager-zvzw.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Cannot connect to the server.');
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', boxSizing: 'border-box' }}>
      <h2 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Login</h2>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Email Address" onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
        Don't have an account?{' '}
        <span style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsRegister(true)}>Sign Up</span>
      </p>
    </div>
  );
}