import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Function to fetch advice from the API
  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const newAdvice = response.data.slip.advice;
      setAdvice(newAdvice);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setAdvice('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // Apply dark mode class to body when the theme changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Fetch advice when the component is first mounted
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="App">
      <h1>Random Advice</h1>

      <div className="advice-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{advice}</p>
        )}
      </div>

      <button onClick={fetchAdvice} disabled={loading}>
        Get New Advice
      </button>

      <button onClick={toggleTheme}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}

export default App;
