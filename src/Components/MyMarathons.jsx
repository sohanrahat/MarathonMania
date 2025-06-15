import React, { useState, useEffect } from 'react';
import '../styles/colors.css';

const MyMarathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/marathons')
            .then(res => res.json())
            .then(data => {
                console.log('All marathons:', data);
                setMarathons(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching marathons:', error);
                setLoading(false);
            });
    }, []);

    const formatDate = (date, isShort = false) => {
        if (!date) return '';
        const options = isShort
            ? { month: 'short', day: 'numeric' }
            : { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">All Marathons</h2>

            {loading ? (
                <p className="text-center py-8">Loading marathons...</p>
            ) : marathons.length === 0 ? (
                <p className="text-center py-8">No marathons found.</p>
            ) : (
                <>
                    {/* large screens only */}
                    <div className="hidden lg:block">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-white uppercase" style={{ backgroundColor: 'var(--secondary)' }}>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Marathon Title</th>
                                        <th scope="col" className="px-6 py-3">Location</th>
                                        <th scope="col" className="px-6 py-3">Distance</th>
                                        <th scope="col" className="px-6 py-3">Registration Period</th>
                                        <th scope="col" className="px-6 py-3">Marathon Date</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {marathons.map((marathon, index) => (
                                        <tr key={marathon.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 truncate">
                                                {marathon.title}
                                            </th>
                                            <td className="px-6 py-4">{marathon.location}</td>
                                            <td className="px-6 py-4">{marathon.runningDistance}</td>
                                            <td className="px-6 py-4">
                                                {formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}
                                            </td>
                                            <td className="px-6 py-4">{formatDate(marathon.marathonStartDate)}</td>
                                            <td className="px-6 py-4 flex flex-wrap gap-1">
                                                <button
                                                    className="w-20 px-1 py-1 text-white text-xs rounded hover:opacity-90"
                                                    style={{ backgroundColor: 'var(--accent)' }}
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    className="w-20 px-1 py-1 text-white text-xs rounded hover:opacity-90"
                                                    style={{ backgroundColor: 'var(--secondary)' }}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="w-20 px-1 py-1 text-white text-xs rounded hover:opacity-90"
                                                    style={{ backgroundColor: 'var(--primary)' }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Cards for small and medium screens */}
                    <div className="lg:hidden">
                        <div className="grid grid-cols-1 gap-4">
                            {marathons.map((marathon, index) => (
                                <div key={marathon.id || index} className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{marathon.title}</h3>

                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-500">Location</p>
                                            <p className="text-sm">{marathon.location}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Distance</p>
                                            <p className="text-sm">{marathon.runningDistance}</p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500">Registration Period</p>
                                        <p className="text-sm">
                                            {formatDate(marathon.startRegistrationDate, true)} - {formatDate(marathon.endRegistrationDate, true)}
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500">Marathon Date</p>
                                        <p className="text-sm">{formatDate(marathon.marathonStartDate)}</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            className="py-2 text-white text-xs rounded hover:opacity-90"
                                            style={{ backgroundColor: 'var(--accent)' }}
                                        >
                                            Details
                                        </button>
                                        <button
                                            className="py-2 text-white text-xs rounded hover:opacity-90"
                                            style={{ backgroundColor: 'var(--secondary)' }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="py-2 text-white text-xs rounded hover:opacity-90"
                                            style={{ backgroundColor: 'var(--primary)' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyMarathons;