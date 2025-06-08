import React from 'react';
import { Link } from 'react-router';
import '../styles/colors.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Solid color with text */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: 'var(--primary)' }}>
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--neutral-light)' }}>
                        MarathonMania
                    </h1>
                    <div className="h-1 w-24 mx-auto mb-6 bg-white"></div>
                    <p className="text-xl" style={{ color: 'var(--neutral-light)' }}>
                        Welcome back! Log in to access your marathon events, track your progress, and connect with fellow runners.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: 'var(--neutral-light)' }}>
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold" style={{ color: 'var(--secondary-dark)' }}>Welcome Back</h2>
                        <div className="h-1 w-16 mx-auto my-3" style={{ backgroundColor: 'var(--primary)' }}></div>
                    </div>

                    <form>
                        <div className="space-y-4">
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
                            </div>

                            {/* Forgot Password Link */}
                            <div className="flex justify-end">
                                <a href="#" className="text-sm hover:underline" style={{ color: 'var(--primary)' }}>
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg font-medium transition-colors duration-300 mt-6"
                                style={{ backgroundColor: 'var(--primary)', color: 'var(--neutral-light)' }}
                            >
                                Log In
                            </button>
                        </div>
                    </form>

                    {/* Register Link */}
                    <div className="text-center mt-6">
                        <p style={{ color: 'var(--neutral-dark)' }}>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium hover:underline" style={{ color: 'var(--primary)' }}>
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;