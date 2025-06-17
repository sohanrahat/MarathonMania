import React, { useState, useEffect, useContext } from 'react';
import '../styles/colors.css';
import { AuthContext } from '../Context/AuthProvider';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [applicationToUpdate, setApplicationToUpdate] = useState(null);
    const { user, axiosSecure } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setLoading(true);
            const token = localStorage.getItem('access-token');
            // only user's applications
            axiosSecure.get('/my-applications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setApplications(response.data);
                    setFilteredApplications(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    // console.error('Error fetching applications:', error);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    // Handle search by title
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setFilteredApplications(applications);
        }
        else {
            const filtered = applications.filter(app =>
                app.marathonTitle.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredApplications(filtered);
        }
    };

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
                axiosSecure.delete(`/registrations/${id}`)
                    .then(response => {
                        const data = response.data;
                        if (data.deletedCount > 0 || data.acknowledged === true) {
                            const updatedApplications = applications.filter(application => application._id !== id);
                            setApplications(updatedApplications);
                            setFilteredApplications(updatedApplications);
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
                        // console.error('Delete error:', error);
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the application.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleUpdate = (application) => {
        setApplicationToUpdate(application);
        setShowModal(true);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedApplication = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            contactNumber: form.contactNumber.value,
            email: form.email.value,
            address: form.address.value,
            emergencyContact: form.emergencyContact.value
        };

        axiosSecure.put(`/registrations/${applicationToUpdate._id}`, updatedApplication)
            .then(response => {
                const data = response.data;
                if (data.modifiedCount > 0 || data.acknowledged === true) {
                    const updatedApplications = applications.map(a =>
                        a._id === applicationToUpdate._id ? { ...a, ...updatedApplication } : a
                    );
                    setApplications(updatedApplications);
                    setFilteredApplications(updatedApplications);
                    setShowModal(false);
                    Swal.fire(
                        'Updated!',
                        'Your application has been updated.',
                        'success'
                    );
                }
            })
            .catch(error => {
                // console.error('Update error:', error);
                Swal.fire(
                    'Error!',
                    'There was a problem updating the application.',
                    'error'
                );
            });
    };

    return (
        <div className="container mx-auto p-4" style={{ overflowX: 'hidden' }}>
            <h2 className="text-2xl font-semibold mb-4">My Applications</h2>

            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by marathon title..."
                    className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ borderColor: 'var(--secondary)', focusRing: 'var(--secondary)' }}
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
                </div>
            ) : applications.length === 0 ? (
                <p className="text-center py-8">No applications found. Register for a marathon!</p>
            ) : filteredApplications.length === 0 ? (
                <p className="text-center py-8">No applications match your search. Try a different term.</p>
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
                                    {filteredApplications.map((application, index) => (
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
                                                        onClick={() => handleUpdate(application)}
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
                            {filteredApplications.map((application, index) => (
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
                                                onClick={() => handleUpdate(application)}
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

            {/* Update Modal */}
            {showModal && applicationToUpdate && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">Update Application</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="p-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        defaultValue={applicationToUpdate.firstName}
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        defaultValue={applicationToUpdate.lastName}
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    defaultValue={applicationToUpdate.contactNumber}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={applicationToUpdate.email}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={applicationToUpdate.address}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    defaultValue={applicationToUpdate.emergencyContact}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white rounded-md"
                                    style={{ backgroundColor: 'var(--secondary)' }}
                                >
                                    Update Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplications;