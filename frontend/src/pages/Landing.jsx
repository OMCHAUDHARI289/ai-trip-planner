import React from 'react';  
import HeroSection from '../components/HeroSection';
import WhyThisWebsite from '../components/WhyThisWebsite';
import ReviewPage from '../components/ReviewPage';

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <WhyThisWebsite />
      <ReviewPage />
    </div>
  );
}

export default Landing; 