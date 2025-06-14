import React from 'react';
import { Outlet } from 'react-router';
import DashNav from '../Components/DashNav';

const DashboardLayout = () => {
    return (
        <div className="container mx-auto my-8">
            <div className="grid grid-cols-5 gap-6 bg-white rounded-lg shadow-md">
                <div className="col-span-1  min-h-screen bg-neutral-light p-4">
                    <DashNav />
                </div>
                <main className="col-span-4 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;