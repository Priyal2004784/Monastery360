import React, { useState } from 'react';
import './Admin.css'; // <-- This is the new line you are adding

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const correctPassword = "sikkim_admin";

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      setError('The password you entered is incorrect. Please try again.');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2>Admin Access Required</h2>
        <p>This area is restricted. Please enter the password to continue.</p>
        <form onSubmit={handlePasswordSubmit} className="login-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            aria-label="Admin password"
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="cta-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default ProtectedRoute;