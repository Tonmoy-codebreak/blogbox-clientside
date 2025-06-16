import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { useAuth } from "../Auth/useAuth";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (search || category) {
          setIsSearching(true);
        } else {
          setLoading(true);
        }

        const query = new URLSearchParams();
        if (search) query.append("search", search);
        if (category) query.append("category", category);

        const res = await axiosSecure.get(`/allblog?${query.toString()}`);
        setBlogs(res.data);

        if (user?.email) {
          const wishRes = await axiosSecure.get(
            `/user/wishlist?email=${user.email}`
          );
          setWishlist(wishRes.data?.wishlist || []);
        }

        setLoading(false);
        setIsSearching(false);
      } catch (err) {
        console.error("Failed to load blogs", err);
        setLoading(false);
        setIsSearching(false);
      }
    };

    fetchBlogs();
  }, [search, category, axiosSecure, user?.email]);

  const handleWishlist = async (blogId) => {
    if (!user) return navigate("/auth/login");

    try {
      await axiosSecure.patch(`/user/wishlist/${user.email}`, { blogId });
      setWishlist((prev) => [...prev, blogId]);
      Swal.fire("Added!", "Blog added to your wishlist.", "success");
    } catch (err) {
      console.error("Failed to wishlist", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-main">
      <h1 className="text-4xl font-bold font-title text-center text-blue-600 mb-10">
        All Blogs
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search input and button */}
        <div className="flex w-full sm:w-2/3 gap-2">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 border-gray-200 border-2 rounded-md focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={() => setSearch(searchInput)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border-gray-200 border-2 rounded-md focus:ring-2 focus:ring-blue-600"
        >
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="travel">Travel</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Searching Spinner */}
      {isSearching && (
        <div className="text-center pb-6">
          <span className="loading loading-dots loading-sm text-blue-600"></span>
        </div>
      )}

      {/* Loader or Blog List */}
      {loading ? (
        <div className="text-center py-20">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => {
            const isWishlisted = wishlist.includes(blog._id);
            return (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full w-fit mb-2">
                    {blog.category}
                  </span>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 flex-grow">
                    {blog.shortDesc}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">By {blog.name}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Read Full →
                    </Link>
                    <button
                      onClick={() => handleWishlist(blog._id)}
                      disabled={isWishlisted}
                      className={`text-sm font-semibold flex items-center gap-1 ${
                        isWishlisted
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-500 hover:text-red-600"
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
      )}
    </div>
  );
};

export default AllBlogs;
