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
      <h1 className='text-xl font-bold'>SignUp</h1>
      <br /><br />
      <form>
        <label> Username </label>
        <input type='text' placeholder='Username' name='userName' value={userData.userName} onChange={textboxchange} required/>
        <br /><br />

        <label> firstName </label>
        <input type='text' placeholder='FirstName' name='firstName' value={userData.firstName} onChange={textboxchange} required/>
        <br /><br />

        <label> lastName </label>
        <input type='text' placeholder='LastName' name='lastName' value={userData.lastName} onChange={textboxchange} required/>
        <br /><br />

        <label> Email </label>
        <input type='text' placeholder='Email' name='emailAddress' value={userData.emailAddress} onChange={textboxchange} required/>
        <br /><br />

        {/* <label> Account Type </label>
        <input type='text' placeholder='Username' name='accountType' value={userData.accountType} onChange={textboxchange} />
        <br /><br /> */}

        <label> Password </label>
        <input type='text' placeholder='Password' name='password' value={userData.password} onChange={textboxchange} required/>
        <br /><br />

        <label> confirmPassword </label>
        <input type='text' placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword} onChange={textboxchange} required/>
        <br /><br />

      </form>
      <button type='submit' onClick={handleClick}
        className="text-white bg-red-500 w-[30%] ml-72 items-center hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
      > Submit </button>
    </>
  )
}

export default Signup