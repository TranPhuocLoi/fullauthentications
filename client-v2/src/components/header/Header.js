import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
// import axios from 'axios'


function Header() {
  const auth = useSelector(state => state.auth)
  const { user, isLogged } = auth

  console.log({ auth });

  const userLink = () => {
    return <li>
      <Link to="/">
        <img src={user.avatar} alt="" /> {user.name}
      </Link>
    </li>
  }

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Nudo350</Link>
        </h1>
      </div>
      <ul>
        <li><Link to="/cart">Cart</Link></li>
        {
          isLogged ? userLink() : <li><Link to="/login">Login</Link></li>
        }
      </ul>
    </header>
  )
}

export default Header
