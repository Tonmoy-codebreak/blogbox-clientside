import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
export const AuthContext = createContext()
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)

    // Observer
    useEffect(()=>{
         const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            setLoading(false)
         })
         return () =>{unsubscribe()}
    },[])

    // Register User
    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //Log Out User
    const logoutUser = () =>{
        return signOut(auth)
    }

    const value = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        logoutUser

    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;