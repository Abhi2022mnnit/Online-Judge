import { Outlet, Link, useNavigate } from 'react-router-dom'
import {addUser, setUser, setToken, setStep, setProblem } from '../globalStorage/SignupSlice'
import { useDispatch } from 'react-redux';

function Dashboard() {

    const dispatch = useDispatch();
    const loginNavigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        dispatch(addUser({}));
        dispatch(setUser({}));
        dispatch(setToken(null));
        dispatch(setStep(1));
        dispatch(setProblem({}));

        loginNavigate('/login');
    }

    return (
        <div className='flex flex-row gap-4 h-full m-4'>
            <div className='w-[35%] bg-gray-200 rounded-lg h-full'>
                <ul className='p-2 mt-4'>
                    <Link to='/dashboard/profile'>
                        <li className='p-2 mb-4 border-b-2 border-gray-300 rounded-lg '
                        >My Profile</li>
                    </Link>

                    <Link to='/dashboard/problemSolved'>
                        <li className='p-2 mb-4 border-b-2 border-gray-300 rounded-lg '
                        >Problem Solved</li>
                    </Link>

                    <Link to='/dashboard/problemCreated'>
                        <li className='p-2 mb-4 border-b-2 border-gray-300 rounded-lg '
                        >Problem Created</li>
                    </Link>

                    <button type='submit' onClick={handleLogOut}
                        className='p-2 border-b-2 border-gray-300 rounded-lg hover:bg-gray-300'
                    >LogOut</button>

                </ul>
            </div>
            
            <div className='flex item-center justify-between border-2 border-gray-200 w-full'>
                <Outlet />
            </div>

        </div>
    )
}

export default Dashboard;