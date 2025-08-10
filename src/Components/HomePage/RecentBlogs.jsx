import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link, useNavigate } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAuth } from "../../Auth/useAuth";
import Swal from "sweetalert2";
import { GoArrowUpRight } from "react-icons/go";

const RecentBlogs = ({ isDark }) => {
  const axiosSecure = useAxios();
  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axiosSecure.get("/blogs/recent");
        setBlogs(blogRes.data);

        if (user?.email) {
          const wishlistRes = await axiosSecure.get(
            `/user/wishlist?email=${user.email}`
          );
          setWishlist(wishlistRes.data?.wishlist || []);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching recent blogs or wishlist", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, user?.email]);

  const handleWishlist = async (blogId) => {
    if (!user) {
      return navigate("/auth/login");
    }

    try {
      await axiosSecure.patch(`/user/wishlist/${user.email}`, { blogId });
      setWishlist((prev) => [...prev, blogId]);
      Swal.fire({
        title: "Added to Wishlist",
        icon: "success",
      });
    } catch (err) {
      console.error("Failed to add to wishlist", err);
    }
  };

  if (loading) {
    return (
      <div className="w-9/12 mx-auto text-center py-32">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  // Conditional classes for background and text
  const bgColor = isDark ? "bg-gray-900" : "bg-gray-50";
  const textTitle = isDark ? "text-white" : "text-gray-800";
  const textDesc = isDark ? "text-gray-300" : "text-gray-600";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const btnWishlisted = isDark
    ? "text-gray-400 cursor-not-allowed"
    : "text-gray-400 cursor-not-allowed";
  const btnWishlist = isDark
    ? "text-red-400 hover:text-red-500"
    : "text-red-500 hover:text-red-600";

  return (
    <div className={`${bgColor} py-16 min-h-screen transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className={`text-center text-4xl sm:text-5xl font-semibold text-blue-600 font-title mb-14 lg:pt-20`}
        >
          Recent Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => {
            const isWishlisted = wishlist.includes(blog._id);

            return (
              <div
                key={blog._id}
                className={`${cardBg} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col`}
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className={`p-6 flex flex-col flex-grow font-main`}>
                  <h2 className={`text-xl font-semibold mb-2 ${textTitle}`}>
                    {blog.title}
                  </h2>
                  <p className={`${textDesc} flex-grow hidden md:block text-sm`}>
                    {blog.shortDesc}
                  </p>

                  <div className="mt-5 flex justify-between items-center">
                    <Link
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                      to={`/blog/${blog._id}`}
                    >
                      <span className="flex items-center gap-1">
                        Details <GoArrowUpRight />
                      </span>
                    </Link>

                    <button
                      onClick={() => handleWishlist(blog._id)}
                      disabled={isWishlisted}
                      className={`text-sm font-semibold flex items-center gap-2 transition ${
                        isWishlisted ? btnWishlisted : btnWishlist
                      }`}
                    >
                      {isWishlisted ? (
                        <>
                          <FaHeart /> Wishlisted
                        </>
                      ) : (
                        <>
                          <FaRegHeart /> Wishlist
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
