import React from 'react';
import { Outlet } from 'react-router';
import DashNav from '../Components/DashNav';

const DashboardLayout = () => {
    return (
        <div className="grid grid-cols-5">
            <div className="col-span-1">
                <DashNav />
            </div>
            <main className="col-span-4 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;