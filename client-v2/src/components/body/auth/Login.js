import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import { dispatchLogin } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};


function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch()
  const history = useHistory()

  const { email, password, err, success } = user;

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: "" })
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { email, password })
      setUser({ ...user, err: "", success: res.data.msg })

      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      history.push("/")

    } catch (err) {
      err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" })
    }
  }

  return (
    <div className="loginPage">
      <h2 className="login_title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Enter your email" id="userEmail" value={email} name="email" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter your email" id="userPassword" value={password} name="password" onChange={handleChangeInput} />
        </div>
        <div className="row">
          <div className="col_inner">
            <button type="submit" >Login</button>
            <Link to="/forgot-password"> Forgot password</Link>
          </div>
        </div>
      </form>
      <p className="mt-4"><Link to="/register">Create account</Link></p>
      <div className="notification">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </div>
  )
}

export default Login
