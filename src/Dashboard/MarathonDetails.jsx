import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaSpinner, FaMapMarkerAlt, FaRunning, FaCalendarAlt, FaUsers, FaClock } from 'react-icons/fa';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../styles/colors.css';
import { AuthContext } from '../Context/AuthProvider';

const MarathonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, axiosSecure } = useContext(AuthContext);

    const [marathon, setMarathon] = useState(null);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!user) {
            setError('Please log in to view marathon details');
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('access-token');
        if (!token) {
            setError('Authentication token not found. Please log in again.');
            setLoading(false);
            return;
        }

        axiosSecure
            .get(`/marathons/${id}`)
            .then(res => {
                setMarathon(res.data);
                setLoading(false);
            })
            .catch(err => {
                // console.error(err);
                if (err.response?.status === 401) {
                    setError('Session expired. Please log in again.');
                } else {
                    setError(err.response?.data?.message || 'Failed to fetch marathon');
                }
                setLoading(false);
            });
    }, [id, user, axiosSecure]);

    useEffect(() => {
        if (!marathon || !user) return;

        axiosSecure
            .get(`/registrations`)
            .then(res => {
                const regs = res.data.filter(reg => reg.marathonId === id);
                setRegistrationCount(regs.length);

                const registered = regs.some(r => r.email === user.email);
                setAlreadyRegistered(registered);
            })
        // .catch(err => console.error('Error fetching registrations:', err));
    }, [marathon, user, id, axiosSecure]);

    // 3️⃣ Countdown timer 
    useEffect(() => {
        if (!marathon) return;

        const calc = () => {
            const end = new Date(marathon.endRegistrationDate).getTime();
            const now = Date.now();
            const diff = end - now;

            if (diff <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
            }

            return {
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
                isExpired: false
            };
        };

        setTimeLeft(calc());
        const timer = setInterval(() => setTimeLeft(calc()), 1000);
        return () => clearInterval(timer);
    }, [marathon]);

    const formatDate = d =>
        new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <FaSpinner className="animate-spin text-4xl" style={{ color: 'var(--primary)' }} />
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    if (!marathon) {
        return <div className="p-4">Marathon not found</div>;
    }

    return (
        <div className="p-2 sm:p-4">
            <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center sm:text-left"
                style={{ color: 'var(--neutral-dark)' }}
            >
                {marathon.title}
            </h2>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={marathon.imageUrl || 'https://placehold.co/1200x400?text=Marathon'}
                    alt={marathon.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    onError={e => (e.target.src = 'https://placehold.co/1200x400?text=Marathon')}
                />

                <div className="p-4 sm:p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        {[
                            {
                                icon: <FaMapMarkerAlt style={{ color: 'var(--secondary)' }} />,
                                label: 'Location',
                                value: marathon.location
                            },
                            {
                                icon: <FaRunning style={{ color: 'var(--primary)' }} />,
                                label: 'Distance',
                                value: marathon.runningDistance
                            },
                            {
                                icon: <FaCalendarAlt style={{ color: 'var(--accent)' }} />,
                                label: 'Marathon Date',
                                value: formatDate(marathon.marathonStartDate)
                            },
                            {
                                icon: <FaUsers style={{ color: 'var(--secondary)' }} />,
                                label: 'Registrations',
                                value: registrationCount
                            }
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center"
                            >
                                <div className="p-2 rounded-full mr-3" style={{ backgroundColor: 'var(--neutral-light)' }}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-xs uppercase font-semibold text-gray-500">{stat.label}</h3>
                                    <p className="font-medium">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Registration Period */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--secondary)' }}>Registration Period</h3>
                        <p className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            {formatDate(marathon.startRegistrationDate)} – {formatDate(marathon.endRegistrationDate)}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--secondary)' }}>Description</h3>
                        <p className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-gray-700">
                            {marathon.description}
                        </p>
                    </div>

                    {/* Countdown & Register Button */}
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
                                        duration={Math.max(1,
                                            timeLeft.days * 86400 +
                                            timeLeft.hours * 3600 +
                                            timeLeft.minutes * 60 +
                                            timeLeft.seconds
                                        )}
                                        size={200}
                                        strokeWidth={12}
                                        colors={['#F7B801', '#A30000']}
                                        colorsTime={[7, 0]}
                                        colors={['#F7B801', '#A30000']}
                                        colorsTime={[7, 0]}
                                    >
                                        {({ remainingTime }) => {
                                            const d = Math.floor(remainingTime / 86400);
                                            const h = Math.floor((remainingTime % 86400) / 3600);
                                            const m = Math.floor((remainingTime % 3600) / 60);
                                            const s = remainingTime % 60;
                                            return (
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold" style={{ color: 'var(--secondary)' }}>
                                                        {d}d {h}h
                                                    </div>
                                                    <div className="text-xl font-medium" style={{ color: 'var(--primary)' }}>
                                                        {m}m {s}s
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-1">Remaining</div>
                                                </div>
                                            );
                                        }}
                                    </CountdownCircleTimer>
                                </div>
                            )}

                            <button
                                className="px-6 py-3 rounded-md hover:opacity-90 transition-colors text-white font-medium w-full sm:w-auto"
                                style={{
                                    backgroundColor:
                                        timeLeft.isExpired || alreadyRegistered ? 'var(--neutral-dark)' : 'var(--primary)'
                                }}
                                onClick={() => navigate(`/dashboard/marathon-registration/${id}`)}
                                disabled={timeLeft.isExpired || alreadyRegistered}
                            >
                                {timeLeft.isExpired
                                    ? 'Registration Closed'
                                    : alreadyRegistered
                                        ? 'Already Registered'
                                        : 'Register Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarathonDetails;
