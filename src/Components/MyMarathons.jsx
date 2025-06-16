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
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetch('http://localhost:3000/marathons')
                .then(res => res.json())
                .then(data => {
                    // console.log('All marathons:', data);
                    const userMarathons = data.filter(marathon =>
                        marathon.creatorEmail === user.email
                    );
                    // console.log('User marathons:', userMarathons);
                    setMarathons(userMarathons);
                    setLoading(false);
                })
                .catch(error => {
                    // console.error('Error fetching marathons:', error);
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
                fetch(`http://localhost:3000/marathons/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
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
            marathonStartDate: form.marathonDate.value
        };

        fetch(`http://localhost:3000/marathons/${marathonToUpdate._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMarathon)
        })
            .then(res => res.json())
            .then(data => {
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
                                            style={{ backgroundColor: 'var(--secondary)' }}
                                            onClick={() => handleUpdate(marathon)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className=" cursor-pointer py-2 text-white text-xs rounded hover:opacity-90"
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

            {/* Update Modal */}
            {showModal && marathonToUpdate && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">Update Marathon</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="p-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={marathonToUpdate.title}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={marathonToUpdate.location}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                                <input
                                    type="text"
                                    name="distance"
                                    defaultValue={marathonToUpdate.runningDistance}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Start Date</label>
                                <input
                                    type="date"
                                    name="startRegistration"
                                    defaultValue={marathonToUpdate.startRegistrationDate?.split('T')[0]}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration End Date</label>
                                <input
                                    type="date"
                                    name="endRegistration"
                                    defaultValue={marathonToUpdate.endRegistrationDate?.split('T')[0]}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Date</label>
                                <input
                                    type="date"
                                    name="marathonDate"
                                    defaultValue={marathonToUpdate.marathonStartDate?.split('T')[0]}
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
                                    Update Marathon
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