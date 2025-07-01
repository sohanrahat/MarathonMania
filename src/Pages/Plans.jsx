import React from 'react';
import { Link } from 'react-router';
import { Check, Lock } from 'lucide-react';
import '../styles/colors.css';

// For a more authentic sports font, consider using:
// - Google Fonts: Bebas Neue, Oswald, or Anton
// - Custom fonts: Nike Futura, Adidas Linear, or similar athletic fonts
// Add to your project: @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

const Plans = () => {
    const plans = [
        {
            name: "EASY JOGGER",
            description: "Perfect for casual runners and beginners.",
            price: 29,
            yearlyPrice: 290,
            benefits: [
                "1x group run per week",
                "Light warm-up & cooldown guidance",
                "Basic training plan for 5K-10K",
                "Club T-shirt after 2 months",
                "Access to member-only events"
            ],
            featured: false
        },
        {
            name: "TEMPO TRAINER",
            description: "Great for runners building endurance and speed.",
            price: 49,
            yearlyPrice: 490,
            benefits: [
                "2x group sessions per week",
                "Custom 10K-half marathon plan",
                "Monthly form check & pace analysis",
                "Nutrition and hydration tips",
                "Priority registration for club races"
            ],
            featured: true
        },
        {
            name: "RACE WARRIOR",
            description: "Ideal for competitive runners preparing for races.",
            price: 79,
            yearlyPrice: 790,
            benefits: [
                "3x guided sessions per week",
                "Personalized full marathon plan",
                "1-on-1 coaching check-in each month",
                "Race day pacing & support team",
                "Recovery workshops and injury tips"
            ],
            featured: false
        }
    ];

    return (
        <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--neutral-light)' }}>
            {/* Header */}
            <div className="w-11/12 mx-auto">
                <div className="text-center mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                            <p className="font-medium mb-4 flex items-center justify-center gap-2" style={{ color: 'var(--primary)' }}>
                                <span style={{ color: 'var(--primary)' }}>||</span> FLEXIBLE PLANS <span style={{ color: 'var(--primary)' }}>||</span>
                            </p>
                            <h1 className="text-3xl md:text-4xl lg:text-7xl font-black italic tracking-tight" style={{ fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', color: 'var(--secondary-dark)' }}>
                                GET MORE FROM EVERY RUN<br />
                                WITH <span style={{ color: 'var(--primary)' }}>OUR PLANS.</span>
                            </h1>
                        </div>

                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-3xl p-6 transition-all shadow-xl ${plan.featured ? 'transform scale-105' : ''}`}
                            style={{
                                backgroundColor: plan.featured ? 'var(--primary)' : 'var(--neutral-light)',
                                color: plan.featured ? 'var(--neutral-light)' : 'var(--secondary-dark)'
                            }}
                        >
                            {/* Plan Header */}
                            <div className="text-center mb-4">
                                <h3 className="text-2xl font-black italic tracking-tight mb-3" style={{
                                    fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif',
                                    color: plan.featured ? 'var(--neutral-light)' : 'var(--secondary-dark)'
                                }}>
                                    {plan.name}
                                </h3>
                                <p className="text-sm" style={{
                                    color: plan.featured ? 'var(--neutral-light)' : 'var(--neutral-dark)'
                                }}>
                                    {plan.description}
                                </p>
                            </div>

                            {/* Pricing */}
                            <div className="text-center mb-4 p-4 rounded-2xl" style={{
                                backgroundColor: plan.featured ? 'var(--primary-dark)' : 'var(--neutral-light)'
                            }}>
                                <div className="text-4xl font-black mb-2" style={{
                                    fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif',
                                    color: plan.featured ? 'var(--neutral-light)' : 'var(--primary)'
                                }}>
                                    ${plan.price}
                                </div>
                                <p className="text-sm" style={{
                                    color: plan.featured ? 'var(--neutral-light)' : 'var(--neutral-dark)'
                                }}>
                                    USD / month or ${plan.yearlyPrice} / year
                                </p>
                            </div>

                            {/* CTA Link */}
                            <Link to="/register" className="w-full py-3 px-6 rounded-lg font-bold transition-all mb-4 text-center block" style={{
                                backgroundColor: plan.featured ? 'var(--neutral-light)' : 'var(--primary)',
                                color: plan.featured ? 'var(--primary)' : 'var(--neutral-light)',
                                textDecoration: 'none'
                            }}>
                                {plan.featured ? 'JOIN MEMBERSHIP' : 'GET STARTED'}
                            </Link>

                            {/* Security Badge */}
                            <div className="flex items-center justify-center gap-2 text-sm mb-4" style={{
                                color: plan.featured ? 'var(--neutral-light)' : 'var(--neutral-dark)'
                            }}>
                                <Lock size={16} />
                                <span>Secure Payments Guaranteed</span>
                            </div>

                            {/* Benefits */}
                            <div>
                                <h4 className="font-black text-lg mb-3 italic tracking-tight" style={{
                                    fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif',
                                    color: plan.featured ? 'var(--neutral-light)' : 'var(--secondary-dark)'
                                }}>
                                    BENEFITS
                                </h4>
                                <ul className="space-y-2">
                                    {plan.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{
                                                color: plan.featured ? 'var(--neutral-light)' : 'var(--primary)'
                                            }} />
                                            <span className="text-sm" style={{
                                                color: plan.featured ? 'var(--neutral-light)' : 'var(--neutral-dark)'
                                            }}>
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plans;