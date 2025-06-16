import React from 'react';
import Banner from '../Components/HomePage/Banner';
import RecentBlogs from '../Components/HomePage/RecentBlogs';
import NewsLetter from '../Components/HomePage/NewsLetter';
import BecomeCreator from '../Components/HomePage/BecomeCreator';
import LastSection from '../Components/HomePage/LastSection';




const HomePage = () => {
    return (
        <div className='bg-gray-50'>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <LastSection></LastSection>
            
            <BecomeCreator></BecomeCreator>
            <NewsLetter></NewsLetter>
            
      

            
        </div>
    );
};

export default HomePage;