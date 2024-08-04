import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import OtpPage from './components/OtpPage.jsx'
import { Provider } from 'react-redux'
import { store } from './globalStorage/store.jsx'
import ProblemList from './components/ProblemList.jsx'
import CreateProblem from './components/CreateProblem.jsx'
import ProblemPage from './components/ProblemPage.jsx'
import AddTestCases from './components/AddTestCases.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProblemCreatedByUser from './components/ProblemCreatedByUser.jsx'
import ProblemSolvedByUser from './components/ProblemSolvedByUser'
import MyProfile from './components/MyProfile.jsx'
import UpdateProblemPage from './components/UpdateProblemPage.jsx'
import IDE from './components/IDE.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Layout />}>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/otpPage' element={<OtpPage />} />
      <Route path='/problemList' element={<ProblemList />} />
      <Route path='/createProblem' element={<CreateProblem />} />
      <Route path='/problems/problem/:problemId' element={<ProblemPage />} />
      <Route path='/problems/updateProblem/:problemId' element={<UpdateProblemPage />} />
      <Route path='/problems/addTestCase' element={<AddTestCases />} />
      <Route path='/ide' element={<IDE />} />

      <Route element={<Dashboard />}>
        <Route path='/dashboard/profile' element={<MyProfile />} />
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
