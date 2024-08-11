import React from 'react'
import { useState } from 'react'
import apiConnect from '../apiServices/apiConnect'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setToken } from '../globalStorage/SignupSlice'



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
      const promise = await apiConnect("POST", "https://online-judge-jq9r.onrender.com/api/phase1/auth/signin", { emailAddress, password });

      if (!promise.data.success) {
        throw new error("Error in Login API ");
      }


      const userData = promise.data.existUser;
      const userToken = promise.data.token;

      localStorage.setItem("User", JSON.stringify(userData))
      localStorage.setItem("Token", JSON.stringify(userToken))

      dispatch(setUser(userData));
      dispatch(setToken(userToken));

      homeNavigate('/dashboard/profile');

    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    // <div className='flex flex-col gap-5'>
    //   <h1>Login</h1>
    //   <form>
    //     <label> Username </label>
    //     <input type='text'
    //       placeholder='Username'
    //       value={userName}
    //       onChange={(e) => setUserName(e.target.value)}
    //     />
    //     <div className='flex flex-row gap-2'>
    //       <label> emailAddress </label>
    //       <input type='text'
    //         placeholder='emailAddress'
    //         value={emailAddress}
    //         onChange={(e) => setemailAddress(e.target.value)}
    //       />
    //     </div>
    //     <div className='flex flex-row gap-2'>
    //       <label> Password </label>
    //       <input type='password'
    //         placeholder='Password'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button type='submit' onClick={handleClick}> Submit </button>
    //   </form>
    // </div>


    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div> */}

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={handleClick}>
          <div>
            <label for="userName" class="block text-sm font-medium leading-6 text-gray-900">User Handle</label>
            <div class="mt-2">
              <input id="userName" name="userName" type="userName" value={userName}
                onChange={(e) => setUserName(e.target.value)} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-red-600 sm:text-sm" />
            </div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" value={emailAddress}
                onChange={(e) => setemailAddress(e.target.value)} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-red-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              {/* <div class="text-sm">
                <a href="#" class="font-semibold text-red-600 hover:text-red-500">Forgot password?</a>
              </div> */}
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>
      </div>
    </div>


  )
}

export default Login