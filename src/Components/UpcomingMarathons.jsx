import React from 'react';
import '../styles/colors.css';
import dhaka from '../assets/Dhaka.avif';
import chittagong from '../assets/chittagong.avif';
import sylhet from '../assets/sylhet.jpg';
import cox from '../assets/cox.jpg';
import rangamati from '../assets/Rangamati.jpg';
import sundarbans from '../assets/sunarbans.jpg';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';



const UpcomingMarathons = () => {
    const upcomingEvents = [
        {
            id: 1,
            title: "Dhaka Marathon 2025",
            date: "July 15, 2025",
            location: "Dhaka, Bangladesh",
            distance: "42.2 km",
            registrationDeadline: "June 30, 2025",
            participants: 1500,
            image: dhaka
        },
        {
            id: 2,
            title: "Chittagong Coastal Run",
            date: "November 3, 2025",
            location: "Chittagong, Bangladesh",
            distance: "21.1 km",
            registrationDeadline: "October 15, 2025",
            participants: 1200,
            image: chittagong
        },
        {
            id: 3,
            title: "Sylhet Tea Garden Marathon",
            date: "October 13, 2025",
            location: "Sylhet, Bangladesh",
            distance: "42.2 km",
            registrationDeadline: "September 30, 2025",
            participants: 800,
            image: sylhet
        },
        {
            id: 4,
            title: "Cox's Bazar Beach Run",
            date: "December 5, 2025",
            location: "Cox's Bazar, Bangladesh",
            distance: "10 km",
            registrationDeadline: "November 20, 2025",
            participants: 2000,
            image: cox
        },
        {
            id: 5,
            title: "Rangamati Hill Marathon",
            date: "August 22, 2025",
            location: "Rangamati, Bangladesh",
            distance: "21.1 km",
            registrationDeadline: "August 1, 2025",
            participants: 600,
            image: rangamati
        },
        {
            id: 6,
            title: "Sundarbans Trail Run",
            date: "January 15, 2026",
            location: "Khulna, Bangladesh",
            distance: "30 km",
            registrationDeadline: "December 31, 2025",
            participants: 500,
            image: sundarbans
        }
    ];

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>UPCOMING MARATHONS</h1>
                <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: 'var(--primary)' }}></div>
                <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--neutral-dark)' }}>
                    Mark your calendar for these exciting upcoming marathon events across Bangladesh.
                    Register early to secure your spot!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold" style={{ color: 'var(--secondary-dark)' }}>{event.title}</h3>
                                    <span className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)' }}>
                                        {event.distance}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="h-5 w-5 mr-2" style={{ color: 'var(--primary)' }} />
                                        <span style={{ color: 'var(--neutral-dark)' }}>{event.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="h-5 w-5 mr-2" style={{ color: 'var(--primary)' }} />
                                        <span style={{ color: 'var(--neutral-dark)' }}>{event.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaUsers className="h-5 w-5 mr-2" style={{ color: 'var(--primary)' }} />
                                        <span style={{ color: 'var(--neutral-dark)' }}>{event.participants} participants</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <p className="text-sm" style={{ color: 'var(--neutral-dark)' }}>
                                        <span className="font-medium">Registration Deadline:</span> {event.registrationDeadline}
                                    </p>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingMarathons;