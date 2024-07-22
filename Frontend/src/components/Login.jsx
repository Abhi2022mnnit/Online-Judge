import React from 'react'
import { useState, useRef } from 'react'


function Login() {

  const [userName, setUserName] = useState();
  const [emailAddress, setemailAddress] = useState();
  const [password, setPassword] = useState();

  function handleClick(e) {
    e.preventDefault();
    console.log("Submitting!!!");


    // try{
    //   const promise = await("POST", "http://localhost:4000/api/phase1/auth/signin", {emailAddress, password});

    //   if(!promise.data.success){
    //     throw new error("Error in Login API ");
    //   }



    // }catch(error){
    //     console.log(error.message);
    // }

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
        <input type='text'
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