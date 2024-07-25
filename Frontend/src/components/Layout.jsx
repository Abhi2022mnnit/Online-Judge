import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Outlet} from 'react-router-dom';

function Layout(){
    return (
        <div className='h-[100vh] w-full border-2 border-gray-500 flex flex-col justify-between'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
} 

export default Layout;
