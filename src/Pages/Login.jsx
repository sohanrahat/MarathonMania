import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import '../styles/colors.css';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        signIn(formData.email, formData.password)
            .then(result => {
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back to MarathonMania!',
                    confirmButtonColor: 'var(--primary)'
                }).then(() => {
                    navigate(from, { replace: true });
                });
            })
            .catch(err => {
                setLoading(false);
                setError(err.message);
                console.error(err);
            });
    };

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
                        Welcome back! Log in to access your marathon events, track your progress, and connect with fellow runners.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: 'var(--neutral-light)' }}>
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold" style={{ color: 'var(--secondary-dark)' }}>Welcome Back</h2>
                        <div className="h-1 w-16 mx-auto my-3" style={{ backgroundColor: 'var(--primary)' }}></div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Email */}
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
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: 'var(--neutral-medium)',
                                            focusRing: 'var(--primary-light)'
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
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
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: 'var(--neutral-medium)',
                                            focusRing: 'var(--primary-light)'
                                        }}
                                        required
                                    />
                                </div>
                            </div>


                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg font-medium transition-colors duration-300 mt-6"
                                style={{
                                    backgroundColor: loading ? 'var(--neutral-medium)' : 'var(--primary)',
                                    color: 'var(--neutral-light)'
                                }}
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>

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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;