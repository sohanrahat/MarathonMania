import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaSpinner } from 'react-icons/fa';

const AllMarathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarathons = async () => {
            try {
                const response = await fetch('http://localhost:3000/marathons');
                if (!response.ok) {
                    throw new Error('Failed to fetch marathons');
                }
                const data = await response.json();
                setMarathons(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMarathons();
    }, []);

    // No longer needed as we're not displaying dates

    if (loading) return (
        <div className="flex justify-center items-center py-16">
            <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
        </div>
    );
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Marathons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marathons.length > 0 ? (
                    marathons.map(marathon => (
                        <div key={marathon._id?.$oid || marathon._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={marathon.imageUrl || "https://placehold.co/600x400?text=Marathon"}
                                alt={marathon.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.src = "https://placehold.co/600x400?text=Marathon";
                                }}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 h-14 overflow-hidden">{marathon.title}</h3>
                                <p className="text-gray-600 mb-4 h-6 overflow-hidden text-ellipsis whitespace-nowrap">{marathon.location}</p>
                                <Link
                                    to={`/marathon/${marathon._id?.$oid || marathon._id}`}
                                    className="w-full inline-block px-4 py-2 text-center text-white rounded-md hover:opacity-90 transition-colors"
                                    style={{ backgroundColor: 'var(--secondary)' }}
                                >
                                    See Details
                                </Link>
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