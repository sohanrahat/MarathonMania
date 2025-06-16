import React from 'react';
import { Link } from 'react-router';
import { FaRunning, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import '../styles/colors.css';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <div className="mb-6">
                <FaRunning className="text-8xl mx-auto" style={{ color: 'var(--primary)' }} />
            </div>
            <h1 className="text-9xl font-bold" style={{ color: 'var(--primary)' }}>404</h1>
            <div className="flex items-center justify-center mt-4 mb-2">
                <FaMapMarkerAlt className="text-xl mr-2" style={{ color: 'var(--accent)' }} />
                <h2 className="text-2xl font-semibold">Marathon Not Found</h2>
            </div>
            <p className="text-gray-600 mb-8">The Marathon you are looking for doesn't exist or has been moved.</p>
            <Link
                to="/"
                className="px-6 py-3 text-white rounded-md transition-all hover:opacity-90 flex items-center"
                style={{ backgroundColor: 'var(--secondary)' }}
            >
                <FaHome className="mr-2" /> Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;