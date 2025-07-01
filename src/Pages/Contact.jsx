import React, { useEffect } from 'react';
import '../styles/colors.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="py-12" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="w-11/12 mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Contact Us</h1>
                    <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: 'var(--primary)' }}></div>
                    <p className="text-base md:text-lg max-w-2xl mx-auto px-4" style={{ color: 'var(--text-secondary)' }}>
                        Have questions about our marathons or need assistance? We're here to help!
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Get in Touch</h2>

                            <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <FaEnvelope className="text-xl" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Email</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>info@marathonmania.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <FaPhone className="text-xl" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Phone</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>+880 1234-567890</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <FaMapMarkerAlt className="text-xl" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Address</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>
                                            123 Marathon Street<br />
                                            Dhaka 1000, Bangladesh
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
                            <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Send us a Message</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="block font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                                        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', '--tw-ring-color': 'var(--primary)' }}
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                                        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', '--tw-ring-color': 'var(--primary)' }}
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Message</label>
                                    <textarea
                                        rows="5"
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                                        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)', '--tw-ring-color': 'var(--primary)' }}
                                        placeholder="Your message here..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-lg font-medium transition-colors duration-300"
                                    style={{ backgroundColor: 'var(--primary)', color: '#ffffff', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;