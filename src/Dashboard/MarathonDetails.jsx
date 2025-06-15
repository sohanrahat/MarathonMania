import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaSpinner, FaMapMarkerAlt, FaRunning, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import '../styles/colors.css';

const MarathonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [marathon, setMarathon] = useState(null);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarathonDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/marathons/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setMarathon(data);
                    setLoading(false);
                    return;
                }

                const allMarathonsResponse = await fetch('http://localhost:3000/marathons');
                if (!allMarathonsResponse.ok) {
                    throw new Error('Failed to fetch marathon details');
                }

                const allMarathons = await allMarathonsResponse.json();
                const foundMarathon = allMarathons.find(m =>
                    (m._id === id) || (m._id?.$oid === id)
                );

                if (foundMarathon) {
                    setMarathon(foundMarathon);

                    // registration count
                    try {
                        const registrationsResponse = await fetch(`http://localhost:3000/registrations/count/${id}`);
                        if (registrationsResponse.ok) {
                            const countData = await registrationsResponse.json();
                            setRegistrationCount(countData.count || 0);
                        }
                    } catch (countErr) {
                        // console.error('Error fetching registration count:', countErr);
                    }
                } else {
                    throw new Error('Marathon not found');
                }
                setLoading(false);
            } catch (err) {
                // console.error('Error fetching marathon:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMarathonDetails();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return (
        <div className="flex justify-center items-center py-16">
            <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
        </div>
    );

    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    if (!marathon) return <div className="p-4">Marathon not found</div>;

    return (
        <div className="p-2 sm:p-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center sm:text-left" style={{ color: 'var(--neutral-dark)' }}>{marathon.title}</h2>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={marathon.imageUrl || "https://placehold.co/1200x400?text=Marathon"}
                    alt={marathon.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/1200x400?text=Marathon";
                    }}
                />

                <div className="p-4 sm:p-6">
                    {/* Stats cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                <FaMapMarkerAlt style={{ color: 'var(--secondary)' }} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-semibold text-gray-500">Location</h3>
                                <p className="font-medium">{marathon.location}</p>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                <FaRunning style={{ color: 'var(--primary)' }} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-semibold text-gray-500">Distance</h3>
                                <p className="font-medium">{marathon.runningDistance}</p>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                <FaCalendarAlt style={{ color: 'var(--accent)' }} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-semibold text-gray-500">Marathon Date</h3>
                                <p className="font-medium">{formatDate(marathon.marathonStartDate)}</p>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                <FaUsers style={{ color: 'var(--secondary)' }} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-semibold text-gray-500">Registrations</h3>
                                <p className="font-medium text-lg" style={{ color: 'var(--secondary)' }}>{registrationCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--secondary)' }}>Registration Period</h3>
                        <p className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            {formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--secondary)' }}>Description</h3>
                        <p className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-gray-700">
                            {marathon.description}
                        </p>
                    </div>

                    <div className="flex justify-center sm:justify-start">
                        <button
                            className="px-6 py-3 rounded-md hover:opacity-90 transition-colors text-white font-medium"
                            style={{ backgroundColor: 'var(--primary)' }}
                            onClick={() => navigate(`/dashboard/marathon-registration/${id}`)}
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarathonDetails;