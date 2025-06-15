import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/useAuth";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";

const WishList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [wishlistedBlogs, setWishlistedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user/wishlisted?email=${user.email}`)
        .then((res) => {
          setWishlistedBlogs(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [axiosSecure, user?.email]);

  const handleRemove = async (blogId) => {
    try {
      await axiosSecure.patch(`/user/wishlist/remove/${user.email}`, {
        blogId,
      });
      setWishlistedBlogs((prev) => prev.filter((blog) => blog._id !== blogId));

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Removed from wishlist",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });


    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading your wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-0 font-main">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-12">
        Your Wishlist
      </h1>

      {wishlistedBlogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font main">
          No blogs in your wishlist.
        </p>
      ) : (
        <div className="space-y-10">
          {wishlistedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row"
            >
              {/* Image section */}
              <div className="sm:w-1/3 h-56 sm:h-auto">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text section */}
              <div className="sm:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-blue-100 text-blue-700 font-medium rounded-full px-3 py-1 inline-block mb-3">
                    {blog.category}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {blog.shortDesc}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">By {blog.name}</p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                  >
                    Read Full →
                  </Link>
                  <button
                    onClick={() => handleRemove(blog._id)}
                    className="text-sm font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-500 rounded-full px-4 py-1 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
