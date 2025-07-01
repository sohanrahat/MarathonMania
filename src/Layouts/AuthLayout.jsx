import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;