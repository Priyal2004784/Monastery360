import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MonasteryDetail from './components/MonasteryDetail';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Pilgrimage from './components/Pilgrimage';
import Culture from './components/Culture';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PlanVisit from './components/PlanVisit'; // <-- IMPORT THE NEW COMPONENT

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/monastery/:id" element={<MonasteryDetail />} />
            <Route path="/pilgrimage" element={<Pilgrimage />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/plan-visit" element={<PlanVisit />} /> {/* <-- ADD THE NEW ROUTE */}
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;