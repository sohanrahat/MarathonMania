import React from 'react';
import '../styles/colors.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="min-h-screen py-16">
            <div className="w-11/12 mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--secondary-dark)' }}>Contact Us</h1>
                    <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: 'var(--primary)' }}></div>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--neutral-dark)' }}>
                        Have questions about our marathons or need assistance? We're here to help!
                    </p>
                </div>
                
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--secondary)' }}>Get in Touch</h2>
                            
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <FaEnvelope className="text-2xl" style={{ color: 'var(--primary)' }} />
                                    <div>
                                        <h3 className="font-semibold" style={{ color: 'var(--secondary)' }}>Email</h3>
                                        <p style={{ color: 'var(--neutral-dark)' }}>info@marathonmania.com</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <FaPhone className="text-2xl" style={{ color: 'var(--primary)' }} />
                                    <div>
                                        <h3 className="font-semibold" style={{ color: 'var(--secondary)' }}>Phone</h3>
                                        <p style={{ color: 'var(--neutral-dark)' }}>+880 1234-567890</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <FaMapMarkerAlt className="text-2xl" style={{ color: 'var(--primary)' }} />
                                    <div>
                                        <h3 className="font-semibold" style={{ color: 'var(--secondary)' }}>Address</h3>
                                        <p style={{ color: 'var(--neutral-dark)' }}>
                                            123 Marathon Street<br />
                                            Dhaka 1000, Bangladesh
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--secondary)' }}>Send us a Message</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block font-medium mb-2" style={{ color: 'var(--secondary)' }}>Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ borderColor: 'var(--neutral-light)', focusRingColor: 'var(--primary)' }}
                                        placeholder="Your Name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block font-medium mb-2" style={{ color: 'var(--secondary)' }}>Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ borderColor: 'var(--neutral-light)', focusRingColor: 'var(--primary)' }}
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block font-medium mb-2" style={{ color: 'var(--secondary)' }}>Message</label>
                                    <textarea 
                                        rows="5"
                                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                                        style={{ borderColor: 'var(--neutral-light)', focusRingColor: 'var(--primary)' }}
                                        placeholder="Your message here..."
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit"
                                    className="w-full py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
                                    style={{ backgroundColor: 'var(--primary)', color: 'var(--neutral-light)' }}
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