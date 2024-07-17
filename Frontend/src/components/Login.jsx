import React from 'react'
import {useState, useRef} from 'react'


function Login() {

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const userNameRef = useRef();
  const passwordRef = useRef();

  function handleClick(e){
    e.preventDefaultValue;
    console.log("Submitting!!!");
    console.log(userNameRef.current);
  }

  return (
    <>
      <h1>Login</h1>
      <br /><br />
      <form>
        <label> Username </label>
        <input type='text' placeholder='Username' value={userNameRef}/>
        <br /><br />
        <label> Password </label>
        <input type='text' placeholder='Password' value={passwordRef}/>
        <br /><br />
        <button type='submit' onClick={handleClick}> Submit </button>
      </form>
    </>

  )
}

export default Login