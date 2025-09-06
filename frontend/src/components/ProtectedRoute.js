// frontend/src/components/ProtectedRoute.js
import React, { useState } from 'react';

// This component takes the real component to render (AdminPanel) as a "child".
function ProtectedRoute({ children }) {
  // We'll use a simple state to track authentication.
  // In a real app, this would be more complex (e.g., using context or tokens).
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const correctPassword = "sikkim_admin"; // Our secret password

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  // If the user is authenticated, show the real component (the children).
  if (isAuthenticated) {
    return children;
  }

  // If not authenticated, show the login form.
  return (
    <div className="login-container">
      <h2>Admin Access Required</h2>
      <form onSubmit={handlePasswordSubmit} className="login-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default ProtectedRoute;