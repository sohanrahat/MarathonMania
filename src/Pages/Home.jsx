import React, { useState } from 'react';
import Hero from '../Components/Hero';
import UpcomingMarathons from '../Components/UpcomingMarathons';
import Testimonials from '../Components/Testimonials';
import TrainingTips from '../Components/TrainingTips';
import Marathons from './Marathons';

const Home = () => {
    const [marathonLimit, setMarathonLimit] = useState(6);
    return (
        <div>
            <Hero />
            <div className="container mx-auto px-4 mt-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-center">Available Marathons</h2>
                </div>
                <Marathons limit={marathonLimit} showTitle={false} />
                <div className="flex justify-center mt-8 mb-12">
                    <button 
                        onClick={() => setMarathonLimit(prev => prev === 6 ? 100 : 6)}
                        className="px-6 py-3 text-white rounded-md transition-all hover:opacity-90"
                        style={{ backgroundColor: 'var(--secondary)' }}
                    >
                        {marathonLimit === 6 ? 'See All Marathons' : 'Show Less'}
                    </button>
                </div>
            </div>
            <UpcomingMarathons />
            <Testimonials />
            <TrainingTips />
        </div>
    );
};

export default Home;