import React from 'react';
import { Outlet } from 'react-router';
import DashNav from '../Components/DashNav';

const DashboardLayout = () => {
    return (
        <div className="flex">
            <DashNav />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;