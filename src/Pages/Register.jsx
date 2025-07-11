import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import '../styles/colors.css';
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';
import registerimage from '../assets/RegisterImage.jpg';

const Register = () => {
    const { createUser, updateUserProfile, auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
    });
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = (value) => {
        setPassword(value);

        if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        }

        if (!/[A-Z]/.test(value)) {
            setPasswordError('Password must contain at least one uppercase letter');
            return false;
        }

        if (!/[a-z]/.test(value)) {
            setPasswordError('Password must contain at least one lowercase letter');
            return false;
        }

        setPasswordError('');
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            return;
        }

        setLoading(true);
        setError('');

        // Create user
        createUser(formData.email, password)
            .then(result => {
                return updateUserProfile(formData.name, formData.photoURL);
            })
            .then(() => {
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Welcome to MarathonMania!',
                    confirmButtonColor: 'var(--primary)'
                }).then(() => {
                    // Sign out the user after registration
                    auth.signOut().then(() => {
                        navigate('/');
                    });
                });
            })
            .catch(err => {
                setLoading(false);
                setError(err.message);
                // console.error(err);
            });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side */}
            <div className="w-full md:w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${registerimage})`
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
                <div className="relative z-10 h-full flex items-center justify-center p-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4" style={{ color: '#ffffff', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>
                            MarathonMania
                        </h1>
                        <div className="h-1 w-24 mx-auto mb-6" style={{ backgroundColor: 'var(--primary)' }}></div>
                        <p className="text-xl" style={{ color: '#ffffff' }}>
                            Join the community of passionate runners and challenge yourself in exciting marathon events across Bangladesh.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Create Account</h2>
                        <div className="h-1 w-16 mx-auto my-3" style={{ backgroundColor: 'var(--primary)' }}></div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)'
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Photo  */}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                                    Photo URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaImage style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <input
                                        type="url"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
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
                                            backgroundColor: 'var(--bg-primary)',
                                            color: 'var(--text-primary)',
                                            borderColor: 'var(--border-color)'
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => validatePassword(e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'border-red-500' : ''}`}
                                        style={{
                                            backgroundColor: 'var(--bg-primary)',
                                            color: 'var(--text-primary)',
                                            borderColor: passwordError ? 'red' : 'var(--border-color)'
                                        }}
                                        required
                                    />
                                </div>
                                {passwordError ? (
                                    <p className="mt-1 text-xs text-red-500">
                                        {passwordError}
                                    </p>
                                ) : (
                                    <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        Password must be at least 6 characters with uppercase and lowercase letters.
                                    </p>
                                )}
                            </div>

                            {/* Submit  */}
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg font-medium transition-colors duration-300 mt-6"
                                style={{
                                    backgroundColor: loading ? 'var(--neutral-medium)' : 'var(--primary)',
                                    color: '#ffffff',
                                    fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif',
                                    fontStyle: 'italic'
                                }}
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p style={{ color: 'var(--text-primary)' }}>
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