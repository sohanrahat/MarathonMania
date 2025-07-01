import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/colors.css';
import marathon1 from '../assets/Marathon1.webp';
import marathon2 from '../assets/Marathon2.jpg';

import sylhet from '../assets/sylhet.jpg';


const Hero = () => {


    const events = [
        {
            title: "Dhaka Marathon 2025",
            date: "July 15, 2025",
            description: "Run through the vibrant streets of Bangladesh's capital",
            image: marathon1
        },
        {
            title: "Chittagong Marathon",
            date: "November 3, 2025",
            description: "Scenic coastal run in the port city",
            image: marathon2
        },
        {
            title: "Sylhet Marathon",
            date: "October 13, 2025",
            description: "Beautiful tea garden trails and lush landscapes",
            image: sylhet
        }
    ];


    return (
        <div className="relative">
            <Swiper
                effect={'fade'}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[EffectFade, Autoplay]}
                className="h-[600px]"
            >
                {events.map((event, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="h-full w-full bg-cover bg-center relative"
                            style={{ backgroundImage: `url('${event.image}')` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center">
                <div className="w-11/12 mx-auto px-4">
                    <div className="max-w-xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-2" style={{ color: '#ffffff', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>
                            MARATHON MANIA
                        </h1>
                        <div className="h-1 w-20 mb-6" style={{ backgroundColor: 'var(--primary)' }}></div>
                        <p className="text-xl mb-8" style={{ color: '#ffffff' }}>
                            Discover the world's most exciting marathon events and join thousands of runners in the ultimate test of endurance.
                        </p>



                        <div className="flex flex-wrap gap-4">
                            <a href="#marathons-section" className="px-8 py-3 rounded text-lg font-medium inline-block"
                                style={{ backgroundColor: 'var(--primary)', color: '#ffffff', textDecoration: 'none' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const section = document.querySelector('.container.mx-auto.px-4.mt-16');
                                    section?.scrollIntoView({ behavior: 'smooth' });
                                }}>
                                Explore Marathons
                            </a>

                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 z-10 p-6 hidden md:block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className="flex gap-8">
                    {events.map((event, index) => (
                        <div key={index} className="text-center">
                            <h3 className="font-bold" style={{ color: 'var(--primary)', fontFamily: 'Bebas Neue, Arial Black, Helvetica, sans-serif', fontStyle: 'italic' }}>{event.title}</h3>
                            <p style={{ color: '#ffffff' }}>{event.date}</p>
                            <p className="text-sm" style={{ color: '#ffffff' }}>{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
