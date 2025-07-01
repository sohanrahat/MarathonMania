import React from 'react';
import { Check, Lock } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex-1">
                            <p className="text-orange-500 font-medium mb-4 flex items-center justify-center gap-2">
                                <span className="text-orange-500">||</span> FLEXIBLE PLANS <span className="text-orange-500">||</span>
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic">
                                GET MORE FROM EVERY RUN<br />
                                WITH <span className="text-orange-500">OUR PLANS.</span>
                            </h1>
                        </div>
                        <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white">
                            CONTACT US
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-3xl p-8 transition-all ${plan.featured
                                    ? 'bg-orange-500 text-white shadow-xl transform scale-105'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                        >
                            {/* Plan Header */}
                            <div className="text-center mb-6">
                                <h3 className={`text-2xl font-bold italic mb-3 ${plan.featured ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm ${plan.featured ? 'text-orange-100' : 'text-gray-600'
                                    }`}>
                                    {plan.description}
                                </p>
                            </div>

                            {/* Pricing */}
                            <div className={`text-center mb-6 p-6 rounded-2xl ${plan.featured ? 'bg-orange-600' : 'bg-white'
                                }`}>
                                <div className="text-4xl font-bold mb-2 text-orange-500">
                                    ${plan.price}
                                </div>
                                <p className={`text-sm ${plan.featured ? 'text-orange-100' : 'text-gray-600'
                                    }`}>
                                    USD / month or ${plan.yearlyPrice} / year
                                </p>
                            </div>

                            {/* CTA Button */}
                            <button className={`w-full py-3 px-6 rounded-lg font-bold transition-all mb-4 ${plan.featured
                                    ? 'bg-white text-orange-500 hover:bg-gray-100'
                                    : 'bg-orange-500 text-white hover:bg-orange-600'
                                }`}>
                                {plan.featured ? 'JOIN MEMBERSHIP' : 'GET STARTED'}
                            </button>

                            {/* Security Badge */}
                            <div className={`flex items-center justify-center gap-2 text-sm mb-6 ${plan.featured ? 'text-orange-100' : 'text-gray-500'
                                }`}>
                                <Lock size={16} />
                                <span>Secure Payments Guaranteed</span>
                            </div>

                            {/* Benefits */}
                            <div>
                                <h4 className={`font-bold text-lg mb-4 italic ${plan.featured ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    BENEFITS
                                </h4>
                                <ul className="space-y-3">
                                    {plan.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-white' : 'text-orange-500'
                                                }`} />
                                            <span className={`text-sm ${plan.featured ? 'text-orange-100' : 'text-gray-600'
                                                }`}>
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