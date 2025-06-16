import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthProvider';

const AddMarathon = () => {
    const [startRegistrationDate, setStartRegistrationDate] = useState(null);
    const [endRegistrationDate, setEndRegistrationDate] = useState(null);
    const [marathonStartDate, setMarathonStartDate] = useState(null);
    const { user } = useContext(AuthContext);

    const handleAddMarathon = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const newMarathon = Object.fromEntries(formData.entries());

        // Add date values that aren't captured by FormData
        newMarathon.startRegistrationDate = startRegistrationDate;
        newMarathon.endRegistrationDate = endRegistrationDate;
        newMarathon.marathonStartDate = marathonStartDate;
        newMarathon.creatorEmail = user.email;
        newMarathon.createdAt = new Date();

        // Send data to API
        fetch('http://localhost:3000/marathons',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMarathon),
            }
        )
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Marathon added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Reset form
                form.reset();
                setStartRegistrationDate(null);
                setEndRegistrationDate(null);
                setMarathonStartDate(null);
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add marathon',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Marathon</h2>

            <form onSubmit={handleAddMarathon} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Title</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Creator Email */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Creator Email</label>
                        <input
                            type="email"
                            name="creatorEmail"
                            value={user?.email || ''}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                            readOnly
                        />
                    </div>

                    {/* Start */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Registration Date</label>
                        <DatePicker
                            selected={startRegistrationDate}
                            onChange={date => setStartRegistrationDate(date)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dateFormat="MMMM d, yyyy"
                            required
                        />
                    </div>

                    {/* End  */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Registration Date</label>
                        <DatePicker
                            selected={endRegistrationDate}
                            onChange={date => setEndRegistrationDate(date)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dateFormat="MMMM d, yyyy"
                            minDate={startRegistrationDate}
                            required
                        />
                    </div>

                    {/* Starting Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Start Date</label>
                        <DatePicker
                            selected={marathonStartDate}
                            onChange={date => setMarathonStartDate(date)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dateFormat="MMMM d, yyyy"
                            minDate={endRegistrationDate}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Distance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Running Distance</label>
                        <select
                            name="runningDistance"
                            defaultValue="10k"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="3k">3k</option>
                            <option value="10k">10k</option>
                            <option value="25k">25k</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    {/* Image URL */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Image URL</label>
                        <input
                            type="url"
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Marathon
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMarathon;