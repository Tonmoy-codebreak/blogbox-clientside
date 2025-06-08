import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
export const AuthContext = createContext()
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

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
         setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // Log In user
    const signinUser = (email,password)=>{
         setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    // Google Sign In
    const signWithGoogle = () =>{
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth,provider)
    }

    //Log Out User
    const logoutUser = () =>{
         setLoading(true);
        return signOut(auth)
    }

    const value = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        logoutUser,
        signinUser,
        signWithGoogle,


    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;