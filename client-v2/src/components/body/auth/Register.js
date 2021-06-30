import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { isEmail, isEmpty, isLength, isMatch } from "../../utils/validation/Validation"

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};


function Register() {
  const [user, setUser] = useState(initialState);

  const { name, email, password, cf_password, err, success } = user;

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: "" })
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (isEmpty(name) || isEmpty(password) || isEmpty(cf_password))
      return setUser({ ...user, err: "Please fill in all fields.", success: "" })

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" })

    if (isLength(password) || isLength(cf_password))
      return setUser({ ...user, err: "Password must be at least 6 characters.", success: "" })

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password didn't match.", success: "" })

    try {
      const res = await axios.post('/user/register', { name, email, password })
      setUser({ ...user, err: "", success: res.data.msg })

    } catch (err) {

      err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" })
    }
  }

  return (
    <div className="loginPage">
      <h2 className="login_title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="name">Username</label>
          <input type="text" placeholder="Enter your name" id="userName" value={name} name="name" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Enter your email" id="userEmail" value={email} name="email" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" id="userPassword" value={password} name="password" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="cf_password">Confirm Password</label>
          <input type="password" placeholder="Confirm password" id="userConfirmPassword" value={cf_password} name="cf_password" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <div className="col_inner">
            <button type="submit" >Register</button>
          </div>
        </div>
      </form>
      <p className="mt-4"> Already an account? <Link to="/login">Login</Link></p>
      <div className="notification">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </div>
  )
}

export default Register
