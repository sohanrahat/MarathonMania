import React, { useState } from 'react';
import { Outlet } from 'react-router';
import DashNav from '../Components/DashNav';

const DashboardLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="container mx-auto my-4 md:my-8">
            <div className="bg-white rounded-lg shadow-md">
                <div className="md:hidden p-4">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="bg-neutral-200 p-2 rounded-md w-full text-left"
                    >
                        {mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                    </button>

                    {mobileMenuOpen && (
                        <div className="mt-4 border-t pt-4">
                            <DashNav />
                        </div>
                    )}
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid md:grid-cols-5 gap-6">
                    <div className="col-span-1 min-h-[70vh] bg-neutral-light p-4 border-r">
                        <DashNav />
                    </div>

                    {/* Desktop */}
                    <main className="col-span-4 p-6">
                        <Outlet />
                    </main>
                </div>

                {/* Mobile */}
                <main className="md:hidden p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;