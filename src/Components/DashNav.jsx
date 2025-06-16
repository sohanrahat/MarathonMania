import React from 'react';
import { NavLink } from 'react-router';
import '../styles/colors.css';

const DashNav = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <ul className="flex flex-col gap-4">
                <li>
                    <NavLink
                        to="all-marathons"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-md font-medium"
                                : "px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                        }
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                            color: isActive ? 'var(--neutral-light)' : 'var(--secondary)'
                        })}
                    >
                        All Marathons
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="my-marathons"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-md font-medium"
                                : "px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                        }
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                            color: isActive ? 'var(--neutral-light)' : 'var(--secondary)'
                        })}
                    >
                        My Marathons
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="applications"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-md font-medium"
                                : "px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                        }
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                            color: isActive ? 'var(--neutral-light)' : 'var(--secondary)'
                        })}
                    >
                        My Applications
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="add-marathon"
                        className={({ isActive }) =>
                            isActive
                                ? "px-4 py-2 rounded-md font-medium"
                                : "px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                        }
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                            color: isActive ? 'var(--neutral-light)' : 'var(--secondary)'
                        })}
                    >
                        Add Marathon
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default DashNav;