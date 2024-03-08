import React from 'react'
import "./home.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='Home-main'>
    <h1></h1>
    <p>Hello there...welcome!</p>
    <Link to="/login" className="Home-login-button">Login</Link>
    <Link to="/register" className="Home-register-button">Register</Link>
  </div>
  )
}

export default Home