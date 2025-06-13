import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

const RecentBlogs = () => {
    const axiosSecure = useAxios()
    const [blogs, setBlogs] = useState([])
    const [loading,setLoading]= useState(true)

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
                
                 <Link className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition" to={`/blog/${blog._id}`}> Details →</Link>
                
                <button className="text-sm font-semibold text-red-500 hover:text-red-600 transition">
                  ♡ Wishlist
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