import React from 'react';
import { Link } from 'react-router-dom';
import "../stylesheets/Navbar.css";

const Navbar = () => {
  //links to other routes in react router dom
  return (<div className='Navbar'>
    <Link to='/home'>
      Home
    </Link>
    <Link to='/profile'>
      Profile
    </Link>
  </div>
  )
}

export default Navbar;