import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isRegister, setIsRegister] = useState(false);

  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  if (token) {
    return <Dashboard token={token} logout={logout} user={user} />;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
      {isRegister ? (
        <Register login={login} setIsRegister={setIsRegister} />
      ) : (
        <Login login={login} setIsRegister={setIsRegister} />
      )}
    </div>
  );
}