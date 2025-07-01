import React from 'react';
import '../styles/colors.css';

const About = () => {
    return (
        <div className="min-h-screen py-16">
            <div className="w-11/12 mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--secondary-dark)' }}>About Us</h1>
                    <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: 'var(--primary)' }}></div>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--secondary)' }}>Our Mission</h2>
                            <p className="text-lg mb-4" style={{ color: 'var(--neutral-dark)' }}>
                                MarathonMania is dedicated to bringing together running enthusiasts from across Bangladesh and beyond. 
                                We believe in the power of community, endurance, and the transformative journey that comes with every step.
                            </p>
                            <p className="text-lg" style={{ color: 'var(--neutral-dark)' }}>
                                Our platform connects runners with exciting marathon events, provides comprehensive training resources, 
                                and fosters a supportive community where every runner can achieve their personal best.
                            </p>
                        </div>
                        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Mission Image Placeholder</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Community</h3>
                            <p style={{ color: 'var(--neutral-dark)' }}>
                                Building connections between runners of all levels and backgrounds.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Excellence</h3>
                            <p style={{ color: 'var(--neutral-dark)' }}>
                                Organizing world-class marathon events with professional standards.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Growth</h3>
                            <p style={{ color: 'var(--neutral-dark)' }}>
                                Supporting every runner's journey from beginner to marathon finisher.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;