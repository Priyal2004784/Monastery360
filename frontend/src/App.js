import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MonasteryDetail from './components/MonasteryDetail';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer'; // Import the new Footer

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main> {/* Add a main tag to wrap content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/monastery/:id" element={<MonasteryDetail />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer /> {/* Add the Footer here */}
      </div>
    </Router>
  );
}

export default App;