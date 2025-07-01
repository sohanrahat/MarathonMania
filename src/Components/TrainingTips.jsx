import React from 'react';
import '../styles/colors.css';
import { FaRunning, FaHeartbeat, FaAppleAlt, FaBed, FaBookOpen, FaVideo } from 'react-icons/fa';
import { Link } from 'react-router';

const TrainingTips = () => {
    const tips = [
        {
            id: 1,
            title: "Progressive Training",
            description: "Gradually increase your mileage by no more than 10% each week to avoid injury and build endurance properly.",
            icon: <FaRunning size={24} />,
            color: "#4CAF50"
        },
        {
            id: 2,
            title: "Heart Rate Monitoring",
            description: "Train in different heart rate zones to improve both aerobic capacity and speed. Use the 220-age formula as a starting point.",
            icon: <FaHeartbeat size={24} />,
            color: "#E91E63"
        },
        {
            id: 3,
            title: "Nutrition Strategy",
            description: "Practice your race-day nutrition during long training runs. Find what works for your body before the big day.",
            icon: <FaAppleAlt size={24} />,
            color: "#FF9800"
        },
        {
            id: 4,
            title: "Recovery Importance",
            description: "Rest days are when your body adapts to training stress. Ensure quality sleep and consider active recovery like gentle yoga.",
            icon: <FaBed size={24} />,
            color: "#2196F3"
        }
    ];

    const resources = [
        {
            id: 1,
            title: "Marathon Training Guide",
            description: "Complete 16-week training plans for beginners to advanced runners.",
            type: "E-Book",
            icon: <FaBookOpen size={24} />,
            color: "#9C27B0"
        },
        {
            id: 2,
            title: "Proper Running Form",
            description: "Video analysis of efficient running technique to prevent injuries.",
            type: "Video Series",
            icon: <FaVideo size={24} />,
            color: "#F44336"
        }
    ];

    return (
        <div className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Training Tips & Resources</h1>
                <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: 'var(--primary)' }}></div>
                <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Prepare for your next marathon with expert advice and valuable resources to help you train effectively.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Training Tips Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Expert Tips</h3>
                        <div className="space-y-6">
                            {tips.map((tip) => (
                                <div key={tip.id} className="rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                    <div className="flex items-start">
                                        <div className="p-3 rounded-full mr-4" style={{ backgroundColor: `${tip.color}20` }}>
                                            <div style={{ color: tip.color }}>{tip.icon}</div>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{tip.title}</h4>
                                            <p style={{ color: 'var(--text-secondary)' }}>{tip.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>Training Resources</h3>
                        <div className="rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                            {resources.map((resource, index) => (
                                <div key={resource.id} className={`p-6 ${index !== resources.length - 1 ? 'border-b' : ''}`} style={index !== resources.length - 1 ? { borderColor: 'var(--border-color)' } : {}}>
                                    <div className="flex items-start">
                                        <div className="p-3 rounded-full mr-4" style={{ backgroundColor: `${resource.color}20` }}>
                                            <div style={{ color: resource.color }}>{resource.icon}</div>
                                        </div>
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <h4 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{resource.title}</h4>
                                                <span className="ml-3 px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'var(--highlight)', color: 'var(--bg-primary)' }}>
                                                    {resource.type}
                                                </span>
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)' }}>{resource.description}</p>
                                            <button className="mt-4 px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
                                                style={{ backgroundColor: 'var(--primary)', color: '#ffffff' }}>
                                                Access Resource
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 rounded-lg p-6 shadow-md" style={{ backgroundColor: 'var(--bg-primary)' }}>
                            <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Need Personalized Training?</h4>
                            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                Our certified coaches can create a custom training plan based on your goals and fitness level.
                            </p>
                            <Link to="/contact" className="w-full py-3 rounded font-medium transition-colors duration-300 block text-center"
                                style={{ backgroundColor: 'var(--primary)', color: '#ffffff' }}>
                                Connect with a Coach
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingTips;