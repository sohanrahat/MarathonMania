import React from 'react';
import { Link } from 'react-router';
import '../styles/colors.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--neutral-dark)', color: 'var(--neutral-light)' }} className="p-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>MarathonMania</h2>
                        <p>Your ultimate destination for marathon events and training resources.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--accent)' }}>Useful Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/marathons" className="hover:underline">Marathons</Link></li>
                            <li><Link to="/about" className="hover:underline">About Us</Link></li>
                            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--accent)' }}>Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-2xl hover:text-[var(--primary)] transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="text-2xl hover:text-[var(--primary)] transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-2xl hover:text-[var(--primary)] transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-2xl hover:text-[var(--primary)] transition-colors">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-600 mt-8 pt-6 text-center">
                    <p>&copy; {new Date().getFullYear()} MarathonMania. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;