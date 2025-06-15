import React from 'react';
import Banner from '../Components/HomePage/Banner';
import RecentBlogs from '../Components/HomePage/RecentBlogs';
import NewsLetter from '../Components/HomePage/NewsLetter';

const HomePage = () => {
    return (
        <div className='bg-gray-50'>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default HomePage;