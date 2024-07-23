import {Outlet, Link} from 'react-router-dom'


function Dashboard(){
    return (
        <div>
            <div className='w-[20%] ml-2'>
                <ul>
                    <Link to='/dashboard/profile'>
                        <li>My Profile</li>
                    </Link>

                    <Link to='/dashboard/problemSolved'>
                        <li>Problem Solved</li>
                    </Link>

                    <Link to='/dashboard/problemCreated'>
                        <li>Problem Created</li>
                    </Link>

                    <Link to='/logout'>
                        <li>LogOut</li>
                    </Link>

                </ul>
            </div>

            <Outlet />

        </div>
    )
}

export default Dashboard;