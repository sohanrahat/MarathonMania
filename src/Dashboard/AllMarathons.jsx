import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { FaSpinner, FaCalendarAlt, FaMapMarkerAlt, FaRunning } from 'react-icons/fa';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider';
import '../styles/colors.css';

const AllMarathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMarathons();
    }, [sortOrder]);

    const fetchMarathons = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://marathon-mania-server.vercel.app/marathons?sort=${sortOrder}`);
            if (!response.ok) {
                throw new Error('Failed to fetch marathons');
            }
            const data = await response.json();
            setMarathons(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleSort = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleViewDetails = (id) => {
        if (!user) {
            navigate('/login', { state: { from: `/dashboard/marathon-details/${id}` } });
        } else {
            navigate(`/dashboard/marathon-details/${id}`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">All Marathons</h2>
                <button
                    onClick={toggleSort}
                    className="flex items-center gap-2 px-3 py-1 rounded-md"
                    style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                >
                    {sortOrder === 'asc' ? (
                        <>Oldest First <FaSortAmountUp /></>
                    ) : (
                        <>Newest First <FaSortAmountDown /></>
                    )}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {marathons.length > 0 ? (
                    marathons.map(marathon => (
                        <div key={marathon._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative">
                                {marathon.imageUrl ? (
                                    <img
                                        src={marathon.imageUrl}
                                        alt={marathon.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <FaRunning className="text-5xl" style={{ color: 'var(--primary)' }} />
                                    </div>
                                )}
                                {/* Overlay with title and location */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                    <h3 className="text-lg font-bold text-white mb-1">{marathon.title}</h3>
                                    <div className="flex items-center text-white text-sm">
                                        <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                                        <span>{marathon.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
                                        {marathon.runningDistance}
                                    </span>
                                    <div className="flex items-center text-sm" style={{ color: 'var(--neutral-dark)' }}>
                                        <FaCalendarAlt className="h-4 w-4 mr-1" style={{ color: 'var(--primary)' }} />
                                        <span>{new Date(marathon.marathonStartDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-3 mb-3">
                                    <p className="text-sm" style={{ color: 'var(--neutral-dark)' }}>
                                        <span className="font-medium">Registration Period:</span> {new Date(marathon.startRegistrationDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })} - {new Date(marathon.endRegistrationDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleViewDetails(marathon._id)}
                                    className="mt-auto w-full py-2 rounded font-medium transition-colors duration-300 block text-center cursor-pointer"
                                    style={{ backgroundColor: 'var(--secondary)', color: 'var(--neutral-light)' }}
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No marathons available.</p>
                )}
            </div>
        </div>
    );
};

export default AllMarathons;
