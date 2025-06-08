import React from 'react';
import Hero from '../Components/Hero';
import UpcomingMarathons from '../Components/UpcomingMarathons';
import Testimonials from '../Components/Testimonials';

const Home = () => {
    return (
        <div>
            <Hero />
            <UpcomingMarathons />
            <Testimonials />
        </div>
    );
};

export default Home;