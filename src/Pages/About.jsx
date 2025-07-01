import React from 'react';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
import { FaUserTie, FaUsers, FaHeart, FaTrophy } from 'react-icons/fa';
import '../styles/colors.css';
import runner from '../assets/AboutRunner.jpg';

const About = () => {
    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Left side - Image/Video section */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl shadow-xl">
                            {/* Background image */}
                            <div className="aspect-[4/5] bg-gradient-to-br from-gray-400 to-gray-600 relative">
                                {/* Simulated runners image - you can replace with actual image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                <img
                                    src={runner}
                                    alt="Runners training together"
                                    className="w-full h-full object-cover"
                                />


                            </div>

                            {/* Read More link */}
                            <div className="absolute bottom-6 right-6">
                                <Link to="/about" className="font-semibold py-1 px-8 rounded-lg transition-colors duration-300 inline-block text-lg" style={{ backgroundColor: 'var(--primary)', color: '#ffffff', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic', textDecoration: 'none' }}>
                                    READ MORE
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="space-y-4">
                        {/* Header */}
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-1 h-6" style={{ backgroundColor: 'var(--primary)' }}></div>
                                <span className="font-medium text-sm tracking-wider uppercase" style={{ color: 'var(--primary)' }}>
                                    About Marathon Mania
                                </span>
                                <div className="w-1 h-6" style={{ backgroundColor: 'var(--primary)' }}></div>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>
                                BUILT BY RUNNERS,<br />
                                POWERED <span style={{ color: 'var(--primary)' }}>BY PASSION.</span>
                            </h2>

                            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                                Marathon Mania is a community-driven running club dedicated to helping runners
                                of all levels train smarter, race harder and recover better.
                            </p>
                        </div>

                        {/* Check points */}
                        <div className="space-y-2">
                            {[
                                'Foster Running Culture',
                                'Support Every Runner',
                                'Build Stronger Community'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <Check className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Why Choose section */}
                        <div className="pt-4">
                            <h3 className="text-2xl font-bold mb-4 italic" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>
                                WHY CHOOSE MARATHON MANIA?
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Feature boxes */}
                                <div className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <FaUserTie className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <h4 className="font-bold mb-2 italic" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>EXPERT-LED TRAINING</h4>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        Guided by certified coaches with real race experience.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <FaUsers className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <h4 className="font-bold mb-2 italic" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>FUN COMMUNITY</h4>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        Motivation and friendship from like-minded runners.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <FaHeart className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <h4 className="font-bold mb-2 italic" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>ALL-LEVEL FRIENDLY</h4>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        Beginner to elite, everyone's welcome here to join and run together.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <FaTrophy className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <h4 className="font-bold mb-2 italic" style={{ color: 'var(--text-primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>EXCLUSIVE EVENTS</h4>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        Exclusive races, meetups, and fitness challenges included.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;