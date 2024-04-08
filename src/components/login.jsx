
import React, { useState } from 'react';
import ExpenseTracker from './ExpenseTracker';
import '../styles/login.css';

const LoginPage = ({ onLogin, onSuccessfulLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    onLogin(email);
    onSuccessfulLogin();
    
  };

  return (
    <div>
      {isLoggedIn ? (
        <ExpenseTracker />
      ) : (
        <div className="login-container">
          <div className="login-card">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
