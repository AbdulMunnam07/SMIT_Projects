// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Fake Store</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* Add more links like Cart, About, etc. */}
      </ul>
    </nav>
  );
};

export default Navbar;
