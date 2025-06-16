import React, { useState, useEffect, useContext } from 'react';
import '../styles/colors.css';
import { AuthContext } from '../Context/AuthProvider';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyMarathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [marathonToUpdate, setMarathonToUpdate] = useState(null);
    const { user, axiosSecure } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setLoading(true);
            // Use the protected endpoint that returns only user's marathons
            axiosSecure.get('/my-marathons')
                .then(response => {
                    console.log('Marathons response:', response.data);
                    setMarathons(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching marathons:', error);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

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
                axiosSecure.delete(`/marathons/${id}`)
                    .then(response => {
                        const data = response.data;
                        if (data.deletedCount > 0 || data.acknowledged === true) {
                            setMarathons(marathons.filter(marathon => marathon._id !== id));
                            Swal.fire(
                                'Deleted!',
                                'Your marathon has been deleted.',
                                'success'
                            );
                        } else {
                            throw new Error('Delete operation not acknowledged');
                        }
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'There was a problem deleting the marathon.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleUpdate = (marathon) => {
        setMarathonToUpdate(marathon);
        setShowModal(true);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedMarathon = {
            title: form.title.value,
            location: form.location.value,
            runningDistance: form.distance.value,
            startRegistrationDate: form.startRegistration.value,
            endRegistrationDate: form.endRegistration.value,
            marathonStartDate: form.marathonDate.value,
            organizerEmail: user.email
        };

        axiosSecure.put(`/marathons/${marathonToUpdate._id}`, updatedMarathon)
            .then(response => {
                const data = response.data;
                if (data.modifiedCount > 0 || data.acknowledged === true) {
                    // Update the marathon in the state
                    const updatedMarathons = marathons.map(m =>
                        m._id === marathonToUpdate._id ? { ...m, ...updatedMarathon } : m
                    );
                    setMarathons(updatedMarathons);
                    setShowModal(false);
                    Swal.fire(
                        'Updated!',
                        'Your marathon has been updated.',
                        'success'
                    );
                }
            })
            .catch(error => {
                Swal.fire(
                    'Error!',
                    'There was a problem updating the marathon.',
                    'error'
                );
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">My Marathons</h2>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
                </div>
            ) : marathons.length === 0 ? (
                <p className="text-center py-8">No marathons found. Create your first marathon!</p>
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
                                        <tr key={marathon._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
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
                                                    style={{ backgroundColor: 'var(--secondary)' }}
                                                    onClick={() => handleUpdate(marathon)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="w-20 px-1 py-1 text-white text-xs rounded hover:opacity-90"
                                                    style={{ backgroundColor: 'var(--primary)' }}
                                                    onClick={() => handleDelete(marathon._id)}
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
                                <div key={marathon._id} className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{marathon.title}</h3>
                                    <div className="space-y-2 mb-4">
                                        <p><span className="font-medium">Location:</span> {marathon.location}</p>
                                        <p><span className="font-medium">Distance:</span> {marathon.runningDistance}</p>
                                        <p><span className="font-medium">Registration:</span> {formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}</p>
                                        <p><span className="font-medium">Marathon Date:</span> {formatDate(marathon.marathonStartDate)}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="flex-1 px-3 py-2 text-white text-sm rounded hover:opacity-90"
                                            style={{ backgroundColor: 'var(--secondary)' }}
                                            onClick={() => handleUpdate(marathon)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="flex-1 px-3 py-2 text-white text-sm rounded hover:opacity-90"
                                            style={{ backgroundColor: 'var(--primary)' }}
                                            onClick={() => handleDelete(marathon._id)}
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

            {/* Update Marathon Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>Update Marathon</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={marathonToUpdate?.title}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={marathonToUpdate?.location}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                                <input
                                    type="text"
                                    name="distance"
                                    defaultValue={marathonToUpdate?.runningDistance}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Start Date</label>
                                <input
                                    type="date"
                                    name="startRegistration"
                                    defaultValue={marathonToUpdate?.startRegistrationDate?.split('T')[0]}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration End Date</label>
                                <input
                                    type="date"
                                    name="endRegistration"
                                    defaultValue={marathonToUpdate?.endRegistrationDate?.split('T')[0]}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Date</label>
                                <input
                                    type="date"
                                    name="marathonDate"
                                    defaultValue={marathonToUpdate?.marathonStartDate?.split('T')[0]}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 mr-2 border border-gray-300 rounded-md text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md text-white"
                                    style={{ backgroundColor: 'var(--secondary)' }}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyMarathons;