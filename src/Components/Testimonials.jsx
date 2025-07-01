import React from 'react';
import '../styles/colors.css';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import Rahima from '../assets/rahima.jpg';
import Kamal from '../assets/kamal.jpg';
import Nusrat from '../assets/nusrat.jpg';


const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Rahima Khan",
            role: "Marathon Runner",
            image: Rahima,
            quote: "The organization was flawless! From registration to finish line, everything was perfectly managed. Will definitely participate again next year.",
            rating: 5
        },
        {
            id: 2,
            name: "Kamal Ahmed",
            role: "First-time Runner",
            image: Kamal,
            quote: "As a first-timer, I was nervous, but the supportive atmosphere and clear guidance made it an unforgettable experience.",
            rating: 5
        },
        {
            id: 3,
            name: "Nusrat Jahan",
            role: "Professional Athlete",
            image: Nusrat,
            quote: "The route was challenging yet beautiful. The water stations were well-placed and the crowd's energy kept me going.",
            rating: 4
        }
    ];

    return (
        <div className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>WHAT RUNNERS ARE SAYING</h1>
                <div className="h-1 w-24 mx-auto mb-8" style={{ backgroundColor: 'var(--primary)' }}></div>
                <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Hear from participants who have experienced our marathons and made unforgettable memories.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-24 h-24 rounded-full object-cover border-4"
                                        style={{ borderColor: 'var(--primary)' }}
                                    />
                                    <div className="absolute -bottom-3 -right-3 rounded-full p-2 shadow-md" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                        <FaQuoteLeft style={{ color: 'var(--primary)' }} />
                                    </div>
                                </div>
                            </div>

                            <p className="text-center italic mb-6" style={{ color: 'var(--text-secondary)' }}>
                                "{testimonial.quote}"
                            </p>

                            <div className="text-center">
                                <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</h4>
                                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{testimonial.role}</p>
                                <div className="flex justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className="mx-0.5"
                                            style={{ color: i < testimonial.rating ? 'var(--primary)' : 'var(--border-color)' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;