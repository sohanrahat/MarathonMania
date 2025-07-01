import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import DashNav from '../Components/DashNav';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen">
            <nav>
                <Navbar />
            </nav>
            
            <div className="pt-20 flex">
                {/* Sidebar Overlay for mobile */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Sidebar Drawer */}
                <div className={`
                    fixed lg:static inset-y-0 left-0 z-50 
                    transform transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64
                    pt-20 lg:pt-0
                `} style={{ backgroundColor: 'var(--primary)' }}>
                    <div className={`h-full overflow-y-auto ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
                        {/* Desktop toggle button */}
                        <div className="hidden lg:block mb-4">
                            <button 
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                className={`${sidebarCollapsed ? 'w-full px-1 py-2 text-xs text-center' : 'p-2 float-right'} rounded-md`}
                                style={{ color: 'var(--neutral-light)' }}
                            >
                                <FaBars size={16} />
                            </button>
                        </div>
                        
                        {/* Mobile header */}
                        <div className="flex justify-between items-center mb-6 lg:hidden">
                            <h2 className="text-xl font-bold" style={{ color: 'var(--neutral-light)' }}>Dashboard</h2>
                            <button 
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 rounded-md" style={{ color: 'var(--neutral-light)' }}
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        
                        <DashNav collapsed={sidebarCollapsed} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-0">
                    {/* Mobile menu button */}
                    <div className="lg:hidden p-4 border-b">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
                            style={{ color: 'var(--secondary-dark)' }}
                        >
                            <FaBars size={20} />
                            <span>Menu</span>
                        </button>
                    </div>

                    {/* Page Content */}
                    <main className="p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;