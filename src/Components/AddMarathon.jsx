import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddMarathon = () => {
    const [marathonData, setMarathonData] = useState({
        title: '',
        startRegistrationDate: null,
        endRegistrationDate: null,
        marathonStartDate: null,
        location: '',
        runningDistance: '10k',
        description: '',
        image: '',
        totalRegistrationCount: 0,
        createdAt: new Date()
    });

    // Handle input 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMarathonData({
            ...marathonData,
            [name]: value
        });
    };

    const handleDateChange = (date, name) => {
        setMarathonData({
            ...marathonData,
            [name]: date
        });
    };

    const handleAddMarathon = (e) => {
        e.preventDefault();

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
                            value={marathonData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Start */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Registration Date</label>
                        <DatePicker
                            selected={marathonData.startRegistrationDate}
                            onChange={(date) => handleDateChange(date, 'startRegistrationDate')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dateFormat="MMMM d, yyyy"
                            required
                        />
                    </div>

                    {/* End  */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Registration Date</label>
                        <DatePicker
                            selected={marathonData.endRegistrationDate}
                            onChange={(date) => handleDateChange(date, 'endRegistrationDate')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dateFormat="MMMM d, yyyy"
                            minDate={marathonData.startRegistrationDate}
                            required
                        />
                    </div>

                    {/* Starting Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Start Date</label>
                        <DatePicker
                            selected={marathonData.marathonStartDate}
                            onChange={(date) => handleDateChange(date, 'marathonStartDate')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            dateFormat="MMMM d, yyyy"
                            minDate={marathonData.endRegistrationDate}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={marathonData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Distance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Running Distance</label>
                        <select
                            name="runningDistance"
                            value={marathonData.runningDistance}
                            onChange={handleChange}
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
                            value={marathonData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    {/* Image */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Image</label>
                        <input
                            type="file"
                            accept="image/*"
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