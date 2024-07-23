import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import OtpPage from './components/OtpPage.jsx'
import { Provider } from 'react-redux'
import { store } from './globalStorage/store.jsx'
import ProblemList from './components/ProblemList.jsx'
import AddProblem from './components/AddProblem.jsx'
import ProblemPage from './components/ProblemPage.jsx'
import AddTestCases from './components/AddTestCases.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProblemCreatedByUser from './components/ProblemCreatedByUser.jsx'
import ProblemSolvedByUser from './components/ProblemSolvedByUser'


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/otpPage' element={<OtpPage />} />
      <Route path='/problemList' element={<ProblemList />} />
      <Route path='/addProblem' element={<AddProblem />} />
      <Route path='/problems/problem/:problemId' element={<ProblemPage />} />
      <Route path='/problems/addTestCase' element={<AddTestCases />} />

      <Route element={<Dashboard />}>
        <Route path='/dashboard/profile' element={<AddProblem />} />
        <Route path='/dashboard/problemSolved' element={<ProblemSolvedByUser />} />
        <Route path='/dashboard/problemCreated' element={<ProblemCreatedByUser />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
