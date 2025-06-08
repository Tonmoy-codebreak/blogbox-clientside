import React from 'react';
import { useAuth } from '../Auth/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className='flex justify-center'>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    if (user && user.email) {
        return children;
    } else {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
};

export default PrivateRoute;