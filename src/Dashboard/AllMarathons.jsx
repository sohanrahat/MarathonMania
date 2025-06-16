import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router'; // ← fixed import
import { FaSpinner } from 'react-icons/fa';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider';

const AllMarathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc'); // Default to newest first
    const { user } = useContext(AuthContext); // Get authenticated user
    const navigate = useNavigate();

    useEffect(() => {
        fetchMarathons();
    }, [sortOrder]);

    const fetchMarathons = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/marathons?sort=${sortOrder}`);
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

    const handleViewDetails = (id) => {
        if (!user) {
            // Redirect to login page with return URL
            navigate('/login', { state: { from: `/dashboard/marathon-details/${id}` } });
        } else {
            // Client-side nav to details
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marathons.length > 0 ? (
                    marathons.map(marathon => (
                        <div key={marathon._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={marathon.imageUrl || "https://placehold.co/600x400?text=Marathon"}
                                alt={marathon.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Marathon"; }}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 h-14 overflow-hidden">
                                    {marathon.title}
                                </h3>
                                <p className="text-gray-600 mb-4 h-6 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {marathon.location}
                                </p>
                                <button
                                    onClick={() => handleViewDetails(marathon._id)}
                                    className="w-full inline-block px-4 py-2 text-center text-white rounded-md hover:opacity-90 transition-colors"
                                    style={{ backgroundColor: 'var(--secondary)' }}
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
