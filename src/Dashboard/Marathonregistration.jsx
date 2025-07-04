import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthProvider';

const MarathonRegistration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, axiosSecure } = useContext(AuthContext);

    const [marathon, setMarathon] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarathonDetails = async () => {
            if (!user) {
                setError('Please log in to register for a marathon');
                setLoading(false);
                return;
            }

            try {
                const response = await axiosSecure.get(`/marathons/${id}`);
                setMarathon(response.data);
                setLoading(false);
            } catch (err) {
                // console.error(err);
                setError(err.response?.data?.message || 'Failed to fetch marathon details');
                setLoading(false);
            }
        };

        fetchMarathonDetails();
    }, [id, user, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const form = e.target;
            const formData = new FormData(form);
            const registrationData = Object.fromEntries(formData.entries());


            registrationData.marathonId = id;
            registrationData.marathonTitle = marathon.title;
            registrationData.marathonDate = marathon.marathonStartDate;
            registrationData.registrationDate = new Date().toISOString();
            registrationData.userEmail = user.email;

            const response = await axiosSecure.post('/registrations', registrationData);

            if (!response.data) {
                throw new Error('Failed to submit registration');
            }

            // Swal
            Swal.fire({
                title: 'Registration Successful!',
                text: `You have successfully registered for ${marathon.title}`,
                icon: 'success',
                confirmButtonText: 'View My Applications',
                confirmButtonColor: 'var(--secondary)'
            }).then((result) => {
                // Navigate
                navigate('/dashboard/applications');
            });
        } catch (err) {
            setError(err.message);
            Swal.fire({
                title: 'Error!',
                text: err.message || 'Failed to submit registration',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: 'var(--primary)'
            });
        } finally {
            setSubmitting(false);
        }
    };

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

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--secondary)' }}>
                Register for Marathon
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
                        Marathon Details
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Title</label>
                        <input
                            type="text"
                            name="marathonTitleDisplay"
                            defaultValue={marathon.title}
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Date</label>
                        <input
                            type="text"
                            name="marathonDateDisplay"
                            defaultValue={formatDate(marathon.marathonStartDate)}
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                            readOnly
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
                            Personal Information
                        </h3>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={user?.email || ''}
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                            readOnly={!!user?.email}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                        <textarea
                            name="additionalInfo"
                            className="w-full p-2 border border-gray-300 rounded-md h-24"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-md text-white font-medium flex items-center justify-center min-w-[150px] cursor-pointer"
                            style={{ backgroundColor: 'var(--secondary)' }}
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : 'Submit Registration'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarathonRegistration;