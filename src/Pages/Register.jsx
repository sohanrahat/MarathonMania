import React from 'react';
import { Link } from 'react-router';
import '../styles/colors.css';
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

const Register = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: 'var(--primary)' }}>
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--neutral-light)' }}>
                        MarathonMania
                    </h1>
                    <div className="h-1 w-24 mx-auto mb-6 bg-white"></div>
                    <p className="text-xl" style={{ color: 'var(--neutral-light)' }}>
                        Join the community of passionate runners and challenge yourself in exciting marathon events across Bangladesh.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: 'var(--neutral-light)' }}>
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold" style={{ color: 'var(--secondary-dark)' }}>Create Account</h2>
                        <div className="h-1 w-16 mx-auto my-3" style={{ backgroundColor: 'var(--primary)' }}></div>
                    </div>

                    <form>
                        <div className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--neutral-dark)' }}>
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: 'var(--neutral-medium)',
                                            focusRing: 'var(--primary-light)'
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Photo URL Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--neutral-dark)' }}>
                                    Photo URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaImage style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <input
                                        type="url"
                                        name="photoURL"
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: 'var(--neutral-medium)',
                                            focusRing: 'var(--primary-light)'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--neutral-dark)' }}>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: 'var(--neutral-medium)',
                                            focusRing: 'var(--primary-light)'
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--neutral-dark)' }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: 'var(--neutral-medium)',
                                            focusRing: 'var(--primary-light)'
                                        }}
                                        required
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Password must be at least 6 characters with uppercase and lowercase letters.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg font-medium transition-colors duration-300 mt-6"
                                style={{ backgroundColor: 'var(--primary)', color: 'var(--neutral-light)' }}
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p style={{ color: 'var(--neutral-dark)' }}>
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium hover:underline" style={{ color: 'var(--primary)' }}>
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;