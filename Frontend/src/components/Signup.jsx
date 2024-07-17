import React, {useState} from 'react';
import axios from 'axios';


function Signup() {

  const [userName, setuserName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [accountType, setaccountType] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleClick = (e) => {
      e.preventDefault();
      console.log("Handle Click");
      console.log(userName);
      console.log(firstName);
      console.log(lastName);
      console.log(email);
      console.log(accountType);
      console.log(password);
      console.log(confirmPassword);

      const SignupDetails = {
        userName : userName,
        firstName : firstName,
        lastName : lastName,
        email : email,
        accountType : accountType,
        password : password,
        confirmPassword : confirmPassword
      }

      console.log("SIGN " + SignupDetails);

      // axios.post(`http://localhost:3000/signup`, SignupDetails)
      // .then(res => {
      //   console.log(res);
      // })
  }


  return (
    <>
      <h1>SignUp</h1>
      <br /><br />
      <form>
        <label> Username </label>
        <input type='text' placeholder='Username' value={userName} onChange={(e) => {setuserName(e.target.value)}}/>
        <br /><br />

        <label> firstName </label>
        <input type='text' placeholder='Username' value={firstName} onChange={(e) => {setfirstName(e.target.value)}}/>
        <br /><br />

        <label> lastName </label>
        <input type='text' placeholder='Username' value={lastName} onChange={(e) => {setlastName(e.target.value)}}/>
        <br /><br />

        <label> Email </label>
        <input type='text' placeholder='Username' value={email} onChange={(e) => {setemail(e.target.value)}}/>
        <br /><br />

        <label> Account Type </label>
        <input type='text' placeholder='Username' value={accountType} onChange={(e) => {setaccountType(e.target.value)}}/>
        <br /><br />

        <label> Password </label>
        <input type='text' placeholder='Password' value={password} onChange={(e) => {setpassword(e.target.value)}}/>
        <br /><br />

        <label> confirmPassword </label>
        <input type='text' placeholder='Password' value={confirmPassword} onChange={(e) => {setconfirmPassword(e.target.value)}}/>
        <br /><br />

        <button type='submit' onClick={handleClick}> Submit </button>
      </form>
    </>
  )
}

export default Signup