import React from 'react';
import { NavLink } from 'react-router';
import '../styles/colors.css';

const DashNav = ({ collapsed = false }) => {
    return (
        <div>
            <ul className="flex flex-col gap-4">
                <li>
                    <NavLink
                        to="all-marathons"
                        className={`${collapsed ? 'px-1 py-2 text-xs text-center' : 'px-4 py-2'} rounded-md font-medium`}
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-primary)'
                        })}
                        title={collapsed ? 'All Marathons' : ''}
                    >
                        {collapsed ? 'AM' : 'All Marathons'}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="my-marathons"
                        className={`${collapsed ? 'px-1 py-2 text-xs text-center' : 'px-4 py-2'} rounded-md font-medium`}
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-primary)'
                        })}
                        title={collapsed ? 'My Marathons' : ''}
                    >
                        {collapsed ? 'MM' : 'My Marathons'}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="applications"
                        className={`${collapsed ? 'px-1 py-2 text-xs text-center' : 'px-4 py-2'} rounded-md font-medium`}
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-primary)'
                        })}
                        title={collapsed ? 'My Applications' : ''}
                    >
                        {collapsed ? 'MA' : 'My Applications'}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="add-marathon"
                        className={`${collapsed ? 'px-1 py-2 text-xs text-center' : 'px-4 py-2'} rounded-md font-medium`}
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-primary)'
                        })}
                        title={collapsed ? 'Add Marathon' : ''}
                    >
                        {collapsed ? '+' : 'Add Marathon'}
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default DashNav;