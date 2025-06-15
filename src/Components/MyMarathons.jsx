import React, { useState, useEffect } from 'react';
import '../styles/colors.css';

const MyMarathons = () => {
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

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">My Marathons</h2>
            
            {loading ? (
                <p>Loading marathons...</p>
            ) : marathons.length === 0 ? (
                <p>No marathons found. Create your first marathon!</p>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                        <thead className="text-xs text-white uppercase" style={{ backgroundColor: 'var(--secondary)' }}>
                            <tr>
                                <th scope="col" className="px-6 py-3 w-1/5">
                                    Marathon Title
                                </th>
                                <th scope="col" className="px-6 py-3 w-1/6">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3 w-1/12">
                                    Distance
                                </th>
                                <th scope="col" className="px-6 py-3 w-1/4">
                                    Registration Period
                                </th>
                                <th scope="col" className="px-6 py-3 w-1/6">
                                    Marathon Date
                                </th>
                                <th scope="col" className="px-6 py-3 w-1/6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {marathons.map((marathon, index) => (
                                <tr key={marathon.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 truncate">
                                        {marathon.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {marathon.location}
                                    </td>
                                    <td className="px-6 py-4">
                                        {marathon.runningDistance}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(marathon.startRegistrationDate).toLocaleDateString()} - {new Date(marathon.endRegistrationDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(marathon.marathonStartDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 flex flex-wrap gap-1">
                                        <button 
                                            className="w-16 px-1 py-1 text-white text-xs rounded hover:opacity-90"
                                            style={{ backgroundColor: 'var(--accent)' }}
                                        >
                                            Details
                                        </button>
                                        <button 
                                            className="w-16 px-1 py-1 text-white text-xs rounded hover:opacity-90"
                                            style={{ backgroundColor: 'var(--secondary)' }}
                                        >
                                            Update
                                        </button>
                                        <button 
                                            className="w-16 px-1 py-1 text-white text-xs rounded hover:opacity-90"
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
            )}
        </div>
    );
};

export default MyMarathons;