import React from 'react';
import { NavLink } from 'react-router';
import '../styles/colors.css';

const Navbar = () => {
    return (
        <div>
            <div className="navbar shadow-sm" style={{ backgroundColor: 'var(--neutral-light)' }}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" style={{ color: 'var(--neutral-dark)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow" 
                            style={{ backgroundColor: 'var(--neutral-light)' }}>
                            <li><NavLink to="/" style={{ color: 'var(--secondary)' }}>Home</NavLink></li>
                            <li><NavLink to="/marathons" style={{ color: 'var(--secondary)' }}>Marathons</NavLink></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl" style={{ color: 'var(--primary)' }}>MM</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-3">
                        <li><NavLink to="/" style={{ color: 'var(--secondary)' }}>Home</NavLink></li>
                        <li><NavLink to="/marathons" style={{ color: 'var(--secondary)' }}>Marathons</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    <NavLink to="/login" className="btn btn-sm md:btn-md" style={{ backgroundColor: 'var(--secondary)', color: 'var(--neutral-light)', border: 'none' }}>Login</NavLink>
                    <NavLink to="/register" className="btn btn-sm md:btn-md" style={{ backgroundColor: 'var(--primary)', color: 'var(--neutral-light)', border: 'none' }}>Register</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;