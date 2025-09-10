import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/login', formData);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      navigate('/plan-visit'); // <-- REDIRECT TO THE NEW PAGE
    } catch (err) {
      console.error(err.response.data);
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h2>Sign In</h2>
        <p>Enter your credentials to access your account.</p>
        <form onSubmit={onSubmit} className="sign-in-form">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
          <button type="submit" className="cta-button">Sign In</button>
        </form>
        {message && <p className="form-message">{message}</p>}
        <p className="toggle-form-link">
          New user? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;