import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BodyContent from './components/BodyContent';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <BodyContent />
      <Footer />
    </Router>
  );
};

export default App;