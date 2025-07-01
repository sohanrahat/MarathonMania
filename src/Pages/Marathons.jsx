import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaCalendarAlt, FaMapMarkerAlt, FaRunning, FaSpinner } from 'react-icons/fa';
import '../styles/colors.css';

const Marathons = ({ limit, showTitle = true }) => {
    const navigate = useNavigate();
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        fetchMarathons();
    }, [sortOrder]);

    const fetchMarathons = () => {
        setLoading(true);
        fetch(`https://marathon-mania-server.vercel.app/marathons?sort=${sortOrder}`)
            .then(res => res.json())
            .then(data => {
                setMarathons(data);
                setLoading(false);
            })
            .catch(error => {
                // console.error('Error fetching marathons:', error);
                setLoading(false);
            });
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleSeeDetails = (id) => {
        window.scrollTo(0, 0);
        navigate(`/dashboard/marathon-details/${id}`);
    };

    return (
        <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {showTitle && (
                    <>
                        <h2 className="text-4xl font-bold mb-2 text-center" style={{ color: 'var(--secondary-dark)' }}>Available Marathons</h2>
                        <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: 'var(--primary)' }}></div>
                    </>
                )}

                <div className="flex justify-end mb-6">
                    <select
                        className="px-4 py-2 border rounded-md bg-white"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        style={{ borderColor: 'var(--primary)' }}
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
                    </div>
                ) : marathons.length === 0 ? (
                    <p className="text-center py-8">No marathons available at the moment.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {(limit ? marathons.slice(0, limit) : marathons).map(marathon => (
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
                                            <span>{formatDate(marathon.marathonStartDate)}</span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-3 mb-3">
                                        <p className="text-sm" style={{ color: 'var(--neutral-dark)' }}>
                                            <span className="font-medium">Registration Period:</span> {formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleSeeDetails(marathon._id)}
                                        className="mt-auto w-full py-2 rounded font-medium transition-colors duration-300 block text-center cursor-pointer"
                                        style={{ backgroundColor: 'var(--secondary)', color: 'var(--neutral-light)' }}
                                    >
                                        See Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Marathons;