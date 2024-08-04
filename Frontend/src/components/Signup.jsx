import React, { useEffect, useState } from 'react';
import apiConnect from '../apiServices/apiConnect';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../globalStorage/SignupSlice'
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp } from './sendOtp';


function Signup() {

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    accountType: 'Coder',
    password: '',
    confirmPassword: ''
  })

  const textboxchange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    })
    )
  }

  const otpNavigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();                   // To prevent submit the form directly by default
    console.log("Handle Click");

    dispatch(addUser(userData));

    sendOtp(userData.emailAddress, otpNavigate);
  }

  return (
    <>
      <h1>SignUp</h1>
      <br /><br />
      <form>
        <label> Username </label>
        <input type='text' placeholder='Username' name='userName' value={userData.userName} onChange={textboxchange} />
        <br /><br />

        <label> firstName </label>
        <input type='text' placeholder='Username' name='firstName' value={userData.firstName} onChange={textboxchange} />
        <br /><br />

        <label> lastName </label>
        <input type='text' placeholder='Username' name='lastName' value={userData.lastName} onChange={textboxchange} />
        <br /><br />

        <label> Email </label>
        <input type='text' placeholder='Username' name='emailAddress' value={userData.emailAddress} onChange={textboxchange} />
        <br /><br />

        {/* <label> Account Type </label>
        <input type='text' placeholder='Username' name='accountType' value={userData.accountType} onChange={textboxchange} />
        <br /><br /> */}

        <label> Password </label>
        <input type='text' placeholder='Password' name='password' value={userData.password} onChange={textboxchange} />
        <br /><br />

        <label> confirmPassword </label>
        <input type='text' placeholder='Password' name='confirmPassword' value={userData.confirmPassword} onChange={textboxchange} />
        <br /><br />

      </form>
      <button type='submit' onClick={handleClick}> Submit </button>
    </>
  )
}

export default Signup