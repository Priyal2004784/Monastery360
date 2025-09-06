// The final, complete, and correct App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import all our components
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MonasteryDetail from './components/MonasteryDetail';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

// --- THIS WAS THE MISSING LINE ---
import './App.css';
// ---------------------------------

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* The main-content div is removed */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/monastery/:id" element={<MonasteryDetail />} />
          <Route path="/admin" element={ <ProtectedRoute><AdminPanel /></ProtectedRoute> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;