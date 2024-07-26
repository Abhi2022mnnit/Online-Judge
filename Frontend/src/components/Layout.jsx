import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Outlet} from 'react-router-dom';

function Layout(){
    return (
        <div className='min-h-[100vh] w-full flex flex-col justify-between '>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
} 

export default Layout;
