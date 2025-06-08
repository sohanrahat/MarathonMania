import React from 'react';
import Hero from '../Components/Hero';
import UpcomingMarathons from '../Components/UpcomingMarathons';
import Testimonials from '../Components/Testimonials';
import TrainingTips from '../Components/TrainingTips';

const Home = () => {
    return (
        <div>
            <Hero />
            <UpcomingMarathons />
            <Testimonials />
            <TrainingTips />
        </div>
    );
};

export default Home;