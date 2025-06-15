import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../Auth/useAuth";
import Comment from "../Components/BlogDetailsPage/Comment";
import Swal from "sweetalert2";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Fetch blog by ID//////////////////////////////
  useEffect(() => {
    axiosSecure
      .get(`/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, id]);

  // Fetch user's wishlist////////////////////
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user/wishlist?email=${user.email}`)
        .then((res) => {
          setWishlist(res.data?.wishlist || []);
        })
        .catch((err) => {
          console.error("Failed to fetch wishlist", err);
        });
    }
  }, [axiosSecure, user?.email]);

 
  const isWishlisted = wishlist.includes(id);

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
      Swal.fire("Error", "Could not add to wishlist", "error");
    }
  };

  if (loading) {
    return (
      <div className="w-9/12 mx-auto text-center py-32">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center text-red-600 mt-20">Blog not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-main">
      {/* Blog Content */}
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 mb-4">
          <p>
            By: <strong>{blog.name}</strong>
          </p>

          <button
            onClick={() => handleWishlist(blog._id)}
            disabled={isWishlisted}
            className={`md:text-xl cursor-pointer font-semibold flex items-center gap-2 ${
              isWishlisted
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-500 hover:text-red-600"
            } transition`}
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

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-xl shadow-md mb-6"
        />

        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-6">
          {blog.category}
        </span>

        <p className="text-lg text-gray-700 italic mb-8">{blog.shortDesc}</p>

        <article className="text-gray-800 text-[17px] leading-8 whitespace-pre-line">
          {blog.longDesc}
        </article>
      </div>

      {/* Comment Section */}
      <Comment
        blogId={blog._id}
        currentUser={user}
        existingComments={blog.comments}
        blogMail={blog.mail}
      />
    </div>
  );
};

export default BlogDetails;
