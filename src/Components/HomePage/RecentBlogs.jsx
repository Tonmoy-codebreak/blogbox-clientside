import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link, useNavigate } from 'react-router';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useAuth } from '../../Auth/useAuth';

const RecentBlogs = () => {
    const axiosSecure = useAxios()
    const [blogs, setBlogs] = useState([])
    const [loading,setLoading]= useState(true)
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        axiosSecure.get('/blogs/recent')
        .then(res =>{
            setBlogs(res.data)
            setLoading(false)
        })
        .catch(err =>{
            setLoading(false)
        })
    },[axiosSecure])


    if(loading){
        return(
            <div className='w-9/12 mx-auto text-center py-32'>
                <span className="loading loading-dots loading-xl"></span>
            </div>
        )
    }

    const handleWishlist = () =>{

      user?
      alert(`Added to Wishlist`)
      :
      navigate("/auth/login")
    }


   return (
  <div className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-4xl sm:text-5xl font-bold text-blue-600 font-main mb-14">
        Recent Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map(blog => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow font-main">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600 flex-grow">{blog.shortDesc}</p>

              <div className="mt-5 flex justify-between items-center">
                
                 <Link className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition" to={`/blog/${blog._id}`}> 
                 <span className='flex items-center gap-1'>Details <FaArrowRightLong /></span>
                 
                 </Link>
                
                <button onClick={handleWishlist} className="text-sm font-semibold text-red-500 hover:text-red-600 transition cursor-pointer">
                 <span className='flex items-center gap-2'><FaRegHeart /> Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


};

export default RecentBlogs;