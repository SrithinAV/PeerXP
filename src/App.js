import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import LoginPage from './components/login';
import ExpenseTracker from './components/ExpenseTracker';

function App() {

  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
   
    isLoggedIn ? (
      <ExpenseTracker userEmail={email} />
    ) : (
      <LoginPage onLogin={setEmail} onSuccessfulLogin={() => setIsLoggedIn(true)} />
    )


  );
}

export default App;
