import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import DashNav from '../Components/DashNav';

const Dashboard = () => {

    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main className="pt-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--secondary-dark)' }}>Dashboard</h1>
                    <DashNav />
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;