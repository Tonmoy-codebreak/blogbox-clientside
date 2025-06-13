import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="flex font-main items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl md:text-9xl font-extrabold text-blue-600 drop-shadow-lg">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Oops! The page you're looking for doesn't exist or has been moved. Let’s get you back on track.
        </p>
        <Link to="/" className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium rounded-full transition duration-300 shadow-md">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
