import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/add', formData);
      console.log(res.data);
      setMessage('User registered successfully! You can now sign in.');
    } catch (err) { // FIX: Added curly braces here
      console.error(err.response.data);
      setMessage('Error registering user.');
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
        <h2>Create an Account</h2>
        <p>Sign up to save your favorite monasteries and plan your trip.</p>
        <form onSubmit={onSubmit} className="sign-up-form">
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
          <button type="submit" className="cta-button">Sign Up</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
}

export default SignUp;