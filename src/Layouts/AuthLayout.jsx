import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/NavBar';

const AuthLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;