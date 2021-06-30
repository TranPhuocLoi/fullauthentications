import React from 'react'
import { Link } from "react-router-dom"


function Header() {
  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Nudo350</Link>
        </h1>
      </div>
      <ul>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </header>
  )
}

export default Header
