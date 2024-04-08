// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ switchToSignup, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
      try {
        const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        // Check if login is successful based on the response status code
        if (response.status === 200) {
          // If login is successful, trigger the onLogin callback
          onLogin();
        } else {
          // If login is unsuccessful, display error message
          console.error('Login failed:', data.error);
        }
      } catch (error) {
        console.error('Error occurred during login:', error);
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div>
        <button type="button" onClick={switchToSignup}>Switch to Signup</button>
      </div>
    </form>
  );
};

export default LoginForm;
