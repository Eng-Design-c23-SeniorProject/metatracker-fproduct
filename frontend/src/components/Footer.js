import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
  return (
    <div className="footer">
      {/* footer content */}
      <p><Link to="/"><b>MetaTracker</b></Link></p>
    </div>
  );
};

export default Footer;