import React from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

    const token = useSelector((state) => state.myToken);
    const user = useSelector((state) => state.myUser);
    console.log(token);
    // console.log(user);
    console.log(user.image)
    const homeNavigate = useNavigate();

    const gotoProfile = () => {
        homeNavigate('/dashboard/profile');
    }

    return (

        <header className="shadow sticky w-full z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 w-full">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    <p className="font-Ubuntu font-bold text-red-500 text-2xl">Online <span className="font-Ubuntu font-bold text-zinc-600">Judge</span></p>

                    {token === null &&
                        (<div className="flex items-center lg:order-2">
                            <Link
                                to="/login"
                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Sign Up
                            </Link>
                        </div>)
                    }

                    {token !== null &&

                        (<div>
                            <Link
                                to="/createProblem"
                                className="bg-red-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-red-700"
                            >
                                Create Problem
                            </Link>
                            <Link
                                to="/problemList"
                                className="bg-gray-600 text-white m-2 rounded-lg p-2 mx-4 hover:bg-gray-700"
                            >
                                Practice
                            </Link>
                            <button type="button" onClick={gotoProfile}>
                                <img src={user.image} width={35} height={35} className='rounded-full items-center' />
                            </button>
                        </div>
                        )
                    }

                </div>
            </nav>
        </header>
    )
}

export default Header;



{/* <div
    className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
    id="mobile-menu-2"
>
    
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-600" : "text-grey-600"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-600" : "text-grey-600"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                >
                    About
                </NavLink>
            </li>

            <li>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-600" : "text-grey-600"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                >
                    Contact Us
                </NavLink>
            </li>
        </ul>
</div> */}
