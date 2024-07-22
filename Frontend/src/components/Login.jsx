import React from 'react'
import { useState } from 'react'
import apiConnect from '../apiServices/apiConnect'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setToken } from '../globalStorage/ProfileSlice'



function Login() {

  const [userName, setUserName] = useState('');
  const [emailAddress, setemailAddress] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const homeNavigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();
    console.log("Submitting!!!");


    try {
      const promise = await apiConnect("POST", "http://localhost:4000/api/phase1/auth/signin", { emailAddress, password });

      if (!promise.data.success) {
        throw new error("Error in Login API ");
      }

      const userData = promise.data.existUser;
      const userToken = promise.data.token;

      localStorage.setItem("User", JSON.stringify(userData))
      localStorage.setItem("Token", JSON.stringify(userToken))

      dispatch(setUser(userData));
      dispatch(setToken(userToken));

      homeNavigate('/');

    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <>
      <h1>Login</h1>
      <br /><br />
      <form>
        <label> Username </label>
        <input type='text'
          placeholder='Username'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br /><br />
        <label> emailAddress </label>
        <input type='text'
          placeholder='emailAddress'
          value={emailAddress}
          onChange={(e) => setemailAddress(e.target.value)}
        />
        <br /><br />
        <label> Password </label>
        <input type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button type='submit' onClick={handleClick}> Submit </button>
      </form>
    </>

  )
}

export default Login