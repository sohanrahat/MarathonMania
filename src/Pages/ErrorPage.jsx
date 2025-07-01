import React from 'react';
import { Link, useRouteError } from 'react-router';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1751391406981.json';
import '../styles/colors.css';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <div className="h-96 w-96 mb-8">
                <Lottie 
                    animationData={animationData} 
                    loop={true}
                    style={{
                        filter: 'hue-rotate(20deg) saturate(1.2)'
                    }}
                />
            </div>

            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                You've Taken a Wrong Turn!
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
                It seems you've ventured off the race course. The page you're looking for can't be found.
            </p>

            <Link
                to="/"
                className="inline-flex items-center px-8 py-3 text-white rounded-full transition-transform transform hover:scale-105"
                style={{ backgroundColor: 'var(--primary)' }}
            >
                <FaHome className="mr-2" />
                Back to the Starting Line
            </Link>
        </div>
    );
};

export default ErrorPage;