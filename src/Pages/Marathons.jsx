import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaCalendarAlt, FaMapMarkerAlt, FaRunning, FaSpinner } from 'react-icons/fa';
import '../styles/colors.css';

const Marathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/marathons')
            .then(res => res.json())
            .then(data => {
                setMarathons(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching marathons:', error);
                setLoading(false);
            });
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Available Marathons</h2>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
                </div>
            ) : marathons.length === 0 ? (
                <p className="text-center py-8">No marathons available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marathons.map(marathon => (
                        <div key={marathon._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gray-200 relative">
                                {marathon.imageUrl ? (
                                    <img
                                        src={marathon.imageUrl}
                                        alt={marathon.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <FaRunning className="text-5xl" style={{ color: 'orange' }} />
                                    </div>
                                )}
                                <div className="absolute top-0 right-0 bg-white px-3 py-1 m-2 rounded-full" style={{ color: 'var(--accent)' }}>
                                    {marathon.runningDistance}
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{marathon.title}</h3>

                                <div className="flex items-center mb-2">
                                    <FaMapMarkerAlt className="mr-2" style={{ color: 'orange' }} />
                                    <span className="text-gray-700">{marathon.location}</span>
                                </div>

                                <div className="flex items-center mb-3">
                                    <FaCalendarAlt className="mr-2" style={{ color: 'orange' }} />
                                    <span className="text-gray-700">{formatDate(marathon.marathonStartDate)}</span>
                                </div>

                                <div className="mt-4">
                                    <div className="text-sm">
                                        <span className="block text-gray-500">Registration:</span>
                                        <span className="font-medium">{formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Marathons;