import React, { useState } from 'react';
import { Link } from 'react-router';
import '../styles/colors.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        if (email) {
            console.log('Subscribing email:', email);
            setEmail('');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{ backgroundColor: 'var(--secondary)', color: 'var(--neutral-light)' }}>
            {/* Main Footer Content */}
            <div className="w-11/12 mx-auto px-6 py-12">
                {/* Top Section with Social Media and Contact */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
                    {/* Social Media Section */}
                    <div className="mb-8 lg:mb-0">
                        <h3 className="text-lg font-semibold mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>FIND AND FOLLOW US</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--neutral-dark)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--neutral-dark)'}>
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--neutral-dark)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--neutral-dark)'}>
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--neutral-dark)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--neutral-dark)'}>
                                <FaYoutube size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--neutral-dark)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--neutral-dark)'}>
                                <FaTwitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="text-right">
                        <div className="flex items-center justify-end mb-4">
                            <FaPhone style={{ color: 'var(--primary)' }} className="mr-2" size={16} />
                            <p style={{ color: 'var(--primary)' }} className="font-semibold text-sm mr-2">CONTACT US AT</p>
                            <p className="text-lg">+880 1234-567890</p>
                        </div>
                        <div className="flex items-center justify-end">
                            <FaEnvelope style={{ color: 'var(--primary)' }} className="mr-2" size={16} />
                            <p style={{ color: 'var(--primary)' }} className="font-semibold text-sm mr-2">MAIL US AT</p>
                            <p className="text-lg">info@marathonmania.com</p>
                        </div>
                    </div>
                </div>

                {/* Main Navigation and Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                    {/* Company Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>COMPANY</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">About</Link></li>
                            <li><Link to="/contact" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Contact</Link></li>
                            <li><Link to="/plans" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Plans</Link></li>
                        </ul>
                    </div>

                    {/* Get Involved Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>GET INVOLVED</h3>
                        <ul className="space-y-3">
                            <li><Link to="/register" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Membership</Link></li>
                            <li><Link to="/marathons" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Training</Link></li>
                            <li><Link to="/dashboard" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Events Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>EVENTS</h3>
                        <ul className="space-y-3">
                            <li><Link to="/marathons" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Marathons</Link></li>
                            <li><Link to="/marathons" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Challenges</Link></li>
                            <li><Link to="/about" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Community</Link></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>SUPPORT</h3>
                        <ul className="space-y-3">
                            <li><Link to="/contact" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Contact</Link></li>
                            <li><Link to="/help" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Help</Link></li>
                            <li><Link to="/privacy" style={{ color: 'var(--neutral-light)' }} className="hover:text-[var(--primary)] transition-colors">Privacy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-6 tracking-wider" style={{ fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>SUBSCRIBE NEWSLETTER</h3>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--neutral-light)', color: 'var(--secondary-dark)', focusRingColor: 'var(--primary)' }}
                            />
                            <button
                                onClick={handleSubscribe}
                                className="w-full font-bold py-3 px-6 rounded transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--neutral-light)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}
                            >
                                SUBSCRIBE
                            </button>
                        </div>
                        <p style={{ color: 'var(--neutral-light)' }} className="text-sm mt-4 opacity-75">
                            Get the latest news on training tips and events
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div style={{ borderColor: 'var(--neutral-dark)' }} className="border-t">
                <div className="w-11/12 mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center">
                    {/* Logo and Copyright */}
                    <div className="flex items-center mb-4 lg:mb-0">
                        <div className="text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>
                            MARATHON<span style={{ color: 'var(--primary)' }}>MANIA</span>
                        </div>
                    </div>

                    <div style={{ color: 'var(--neutral-light)' }} className="text-sm text-center lg:text-right opacity-75">
                        <p>&copy; {new Date().getFullYear()} MarathonMania. All rights reserved.</p>
                    </div>

                    {/* Scroll to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-colors z-50"
                        style={{ backgroundColor: 'var(--primary)' }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                        aria-label="Scroll to top"
                    >
                        <FaArrowUp size={20} style={{ color: 'var(--neutral-light)' }} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;