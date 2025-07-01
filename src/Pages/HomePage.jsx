import React from 'react';
import Banner from '../Components/HomePage/Banner';
import RecentBlogs from '../Components/HomePage/RecentBlogs';
import NewsLetter from '../Components/HomePage/NewsLetter';
import BecomeCreator from '../Components/HomePage/BecomeCreator';
import LastSection from '../Components/HomePage/LastSection';
import { useOutletContext } from 'react-router';




const HomePage = () => {
      const { isDark } = useOutletContext();
    return (
        <div className={isDark ? "bg-gray-900 text-white min-h-screen" : "bg-gray-50 text-black min-h-screen"}>
      <Banner />
      <RecentBlogs isDark={isDark} />
      <LastSection isDark={isDark} />
      <BecomeCreator isDark={isDark} />
      <NewsLetter isDark={isDark} />
    </div>
    );
};

export default HomePage;