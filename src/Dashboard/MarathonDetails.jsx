import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaSpinner, FaMapMarkerAlt, FaRunning, FaCalendarAlt, FaUsers, FaClock } from 'react-icons/fa';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../styles/colors.css';

import { AuthContext } from '../Context/AuthProvider';

const MarathonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [marathon, setMarathon] = useState(null);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false
    });

    useEffect(() => {
        const fetchMarathonDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/marathons/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setMarathon(data);
                    setLoading(false);
                    return;
                }

                const allMarathonsResponse = await fetch('http://localhost:3000/marathons');
                if (!allMarathonsResponse.ok) {
                    throw new Error('Failed to fetch marathon details');
                }

                const allMarathons = await allMarathonsResponse.json();
                const foundMarathon = allMarathons.find(m =>
                    (m._id === id) || (m._id?.$oid === id)
                );

                if (foundMarathon) {
                    setMarathon(foundMarathon);
                } else {
                    throw new Error('Marathon not found');
                }
                setLoading(false);
            } catch (err) {
                // console.error('Error fetching marathon:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMarathonDetails();
    }, [id]);

    useEffect(() => {
        if (!id || !marathon || !user) return;

        const fetchRegistrations = async () => {
            try {
                // Fetch all registrations
                const timestamp = new Date().getTime();
                const response = await fetch(`http://localhost:3000/registrations?t=${timestamp}`);

                if (response.ok) {
                    const allRegistrations = await response.json();


                    const marathonRegistrations = allRegistrations.filter(reg =>
                        reg.marathonId === id ||
                        reg.marathonId?.$oid === id ||
                        reg.marathonTitle === marathon.title
                    );

                    setRegistrationCount(marathonRegistrations.length);

                    if (user && user.email) {
                        const userRegistered = allRegistrations.some(reg =>
                            reg.email === user.email &&
                            (reg.marathonId === id ||
                                reg.marathonId?.$oid === id ||
                                reg.marathonTitle === marathon.title)
                        );
                        setAlreadyRegistered(userRegistered);
                    }
                }
            } catch (err) {
                // console.error('Error fetching registrations:', err);
            }
        };

        fetchRegistrations();
        const intervalId = setInterval(fetchRegistrations, 2000);
        return () => clearInterval(intervalId);
    }, [id, marathon, user]);

    // Countdown timer 
    useEffect(() => {
        if (!marathon) return;

        const calculateTimeLeft = () => {
            const endDate = new Date(marathon.endRegistrationDate).getTime();
            const now = new Date().getTime();
            const difference = endDate - now;

            if (difference <= 0) {
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isExpired: true
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
                isExpired: false
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [marathon]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return (
        <div className="flex justify-center items-center py-16">
            <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
        </div>
    );

    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    if (!marathon) return <div className="p-4">Marathon not found</div>;

    return (
        <div className="p-2 sm:p-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center sm:text-left" style={{ color: 'var(--neutral-dark)' }}>{marathon.title}</h2>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={marathon.imageUrl || "https://placehold.co/1200x400?text=Marathon"}
                    alt={marathon.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/1200x400?text=Marathon";
                    }}
                />

                <div className="p-4 sm:p-6">
                    {/* Stats cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                <FaMapMarkerAlt style={{ color: 'var(--secondary)' }} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-semibold text-gray-500">Location</h3>
                                <p className="font-medium">{marathon.location}</p>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                <FaRunning style={{ color: 'var(--primary)' }} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-semibold text-gray-500">Distance</h3>
                                <p className="font-medium">{marathon.runningDistance}</p>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                <FaCalendarAlt style={{ color: 'var(--accent)' }} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-semibold text-gray-500">Marathon Date</h3>
                                <p className="font-medium">{formatDate(marathon.marathonStartDate)}</p>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                <FaUsers style={{ color: 'var(--secondary)' }} />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase font-semibold text-gray-500">Registrations</h3>
                                <p className="font-medium text-lg" style={{ color: 'var(--secondary)' }}>{registrationCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--secondary)' }}>Registration Period</h3>
                        <p className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            {formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--secondary)' }}>Description</h3>
                        <p className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-gray-700">
                            {marathon.description}
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center mb-2">
                                <FaClock className="mr-2" style={{ color: 'var(--primary)' }} />
                                <h3 className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
                                    Registration Closes In:
                                </h3>
                            </div>

                            {timeLeft.isExpired ? (
                                <div className="text-red-500 font-bold mb-4">Registration period has ended</div>
                            ) : (
                                <div className="flex justify-center mb-4">
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={
                                            timeLeft.days * 24 * 60 * 60 +
                                            timeLeft.hours * 60 * 60 +
                                            timeLeft.minutes * 60 +
                                            timeLeft.seconds
                                        }
                                        colors={[
                                            ['var(--secondary)', 0.33],
                                            ['var(--accent)', 0.33],
                                            ['var(--primary)', 0.33],
                                        ]}
                                        size={200}
                                        strokeWidth={12}
                                    >
                                        {({ remainingTime }) => {
                                            const days = Math.floor(remainingTime / (60 * 60 * 24));
                                            const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
                                            const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
                                            const seconds = remainingTime % 60;

                                            return (
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold" style={{ color: 'var(--secondary)' }}>
                                                        {days}d {hours}h
                                                    </div>
                                                    <div className="text-xl font-medium" style={{ color: 'var(--primary)' }}>
                                                        {minutes}m {seconds}s
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-1">Remaining</div>
                                                </div>
                                            );
                                        }}
                                    </CountdownCircleTimer>
                                </div>
                            )}

                            <div className="flex justify-center">
                                <button
                                    className="px-6 py-3 rounded-md hover:opacity-90 transition-colors text-white font-medium w-full sm:w- cursor-pointer"
                                    style={{ backgroundColor: timeLeft.isExpired || alreadyRegistered ? 'var(--neutral-dark)' : 'var(--primary)' }}
                                    onClick={() => navigate(`/dashboard/marathon-registration/${id}`)}
                                    disabled={timeLeft.isExpired || alreadyRegistered}
                                >
                                    {timeLeft.isExpired ? 'Registration Closed' :
                                        alreadyRegistered ? 'Already Registered' : 'Register Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarathonDetails;