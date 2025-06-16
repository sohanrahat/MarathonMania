import React, { useState, useEffect, useContext } from 'react';
import '../styles/colors.css';
import { AuthContext } from '../Context/AuthProvider';
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch('http://localhost:3000/registrations')
                .then(res => res.json())
                .then(data => {
                    // console.log('All registrations:', data);
                    const userApplications = data.filter(application =>
                        application.email === user.email
                    );
                    // console.log('User applications:', userApplications);
                    setApplications(userApplications);
                    setLoading(false);
                })
                .catch(error => {
                    // console.error('Error fetching registrations:', error);
                    setLoading(false);
                });
        }
    }, [user]);

    const formatDate = (date, isShort = false) => {
        if (!date) return '';
        const options = isShort
            ? { month: 'short', day: 'numeric' }
            : { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/registrations/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0 || data.acknowledged === true) {
                            setApplications(applications.filter(application => application._id !== id));
                            Swal.fire(
                                'Deleted!',
                                'Your application has been deleted.',
                                'success'
                            );
                        } else {
                            throw new Error('Delete operation not acknowledged');
                        }
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the application.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="container mx-auto p-4" style={{ overflowX: 'hidden' }}>
            <h2 className="text-2xl font-semibold mb-4">My Applications</h2>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
                </div>
            ) : applications.length === 0 ? (
                <p className="text-center py-8">No applications found. Register for a marathon!</p>
            ) : (
                <>
                    {/* large screens only */}
                    <div className="hidden lg:block">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full" style={{ minWidth: '100%', maxWidth: '1400px' }}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500" style={{ tableLayout: 'fixed' }}>
                                <thead className="text-xs text-white uppercase" style={{ backgroundColor: 'var(--secondary)' }}>
                                    <tr>
                                        <th scope="col" className="px-6 py-3" style={{ width: '18%' }}>Marathon Title</th>
                                        <th scope="col" className="px-6 py-3" style={{ width: '15%' }}>Name</th>
                                        <th scope="col" className="px-6 py-3" style={{ width: '12%' }}>Contact</th>
                                        <th scope="col" className="px-6 py-3" style={{ width: '15%' }}>Registration Date</th>
                                        <th scope="col" className="px-6 py-3" style={{ width: '15%' }}>Marathon Date</th>
                                        <th scope="col" className="px-6 py-3" style={{ width: '10%' }}>Status</th>
                                        <th scope="col" className="px-6 py-3" style={{ width: '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((application, index) => (
                                        <tr key={application._id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 truncate">
                                                {application.marathonTitle}
                                            </th>
                                            <td className="px-6 py-4 truncate">{`${application.firstName} ${application.lastName}`}</td>
                                            <td className="px-6 py-4 truncate">{application.contactNumber}</td>
                                            <td className="px-6 py-4 truncate">
                                                {formatDate(application.registrationDate)}
                                            </td>
                                            <td className="px-6 py-4 truncate">{formatDate(application.marathonDate)}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="px-2 py-1 rounded text-xs text-white"
                                                    style={{ backgroundColor: 'var(--accent)' }}
                                                >
                                                    Confirmed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    <button
                                                        className="w-20 px-1 py-1 text-white text-xs rounded hover:opacity-90"
                                                        style={{ backgroundColor: 'var(--secondary)' }}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="w-20 px-1 py-1 text-white text-xs rounded hover:opacity-90"
                                                        style={{ backgroundColor: 'var(--primary)' }}
                                                        onClick={() => handleDelete(application._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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
                            {applications.map((application, index) => (
                                <div key={application._id || index} className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{application.marathonTitle}</h3>

                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-500">Name</p>
                                            <p className="text-sm">{`${application.firstName} ${application.lastName}`}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Contact</p>
                                            <p className="text-sm">{application.contactNumber}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-500">Registration Date</p>
                                            <p className="text-sm">{formatDate(application.registrationDate, true)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Marathon Date</p>
                                            <p className="text-sm">{formatDate(application.marathonDate, true)}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <button
                                                className="py-2 px-3 text-white text-xs rounded hover:opacity-90"
                                                style={{ backgroundColor: 'var(--secondary)' }}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="py-2 px-3 text-white text-xs rounded hover:opacity-90"
                                                style={{ backgroundColor: 'var(--primary)' }}
                                                onClick={() => handleDelete(application._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <span
                                            className="px-3 py-1 rounded text-sm text-white"
                                            style={{ backgroundColor: 'var(--accent)' }}
                                        >
                                            Confirmed
                                        </span>
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

export default MyApplications;