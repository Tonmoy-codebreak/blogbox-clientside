import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useMemo } from 'react';

const useAxios = () => {
    const auth = getAuth();
    const axiosSecure = useMemo(()=>{
        return axios.create({baseURL:import.meta.env.VITE_API_URL})
    },[])

    useEffect(()=>{
        const interceptor = axiosSecure.interceptors.request.use(

            async (config)=>{
                const user = auth.currentUser
                if(user){
                    const token = await user.getIdToken();
                    config.headers.Authorization= `Bearer ${token}`
                }
                return config
            },(error)=>{
                return Promise.reject(error)
            }

        )
        return ()=>{
            axiosSecure.interceptors.request.eject(interceptor)
        }
    },[auth,axiosSecure])

    return axiosSecure
};

export default useAxios;