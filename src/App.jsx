import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Create the necessary CSS file if needed

function App() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch advice from the API
  const fetchAdvice = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const newAdvice = response.data.slip.advice;
      setAdvice(newAdvice); // Update the advice state with the new advice
    } catch (error) {
      console.error('Error fetching advice:', error);
      setAdvice('Oops! Something went wrong.'); // Handle API errors
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

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
    </div>
  );
}

export default App;
