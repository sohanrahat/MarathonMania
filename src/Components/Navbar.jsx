import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import '../styles/colors.css';
import { AuthContext } from '../Context/AuthProvider';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, loading, auth } = useContext(AuthContext);

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
            })
            .catch(error => {
                // console.error('Logout error:', error);
            });
    };
    return (
        <div className="fixed top-0 left-0 right-0 z-50 shadow-sm py-4" style={{ backgroundColor: 'var(--neutral-light)' }}>
            <div className="w-11/12 mx-auto flex justify-between items-center">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" style={{ color: 'var(--neutral-dark)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            style={{ backgroundColor: 'var(--neutral-light)' }}>
                            <li><NavLink to="/marathons" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>Marathons</NavLink></li>
                            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>About Us</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>Contact</NavLink></li>
                            <li><NavLink to="/plans" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>Plans</NavLink></li>
                            {!loading && user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>Dashboard</NavLink></li>}
                        </ul>
                    </div>
                    <NavLink to="/" className="text-2xl font-bold" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif' }}>MarathonMania</NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-3">

                        <li><NavLink to="/marathons" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>Marathons</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>About Us</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>Contact</NavLink></li>
                        <li><NavLink to="/plans" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>Plans</NavLink></li>
                        {!loading && user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'font-bold' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--secondary)' })}>Dashboard</NavLink></li>}
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    {!loading && !user ? (
                        <>
                            <NavLink to="/register" className="btn btn-sm md:btn-md" style={{ backgroundColor: 'var(--primary)', color: 'var(--neutral-light)', border: 'none' }}>Get Started</NavLink>
                        </>
                    ) : (
                        <>
                            {loading ? (
                                <div className="btn btn-ghost btn-circle loading" style={{ color: 'var(--primary)' }}></div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="hidden md:block font-medium" style={{ color: 'var(--secondary)' }}>
                                        {user.displayName || 'User'}
                                    </span>
                                    <div className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="User Avatar" src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <button onClick={handleLogout} className="btn btn-sm md:btn-md" style={{ backgroundColor: 'var(--primary)', color: 'var(--neutral-light)', border: 'none' }}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;