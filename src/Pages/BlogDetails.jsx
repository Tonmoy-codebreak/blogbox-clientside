import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../Auth/useAuth";
import Comment from "../Components/BlogDetailsPage/Comment";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [axiosSecure, id]);

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
      {/* Content part xxxxxxxxxxxxxxxxxxxxxxxxx*/}
      <div>
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 mb-4">
          <p>
            By: <strong>{blog.name}</strong>{" "}
          </p>
        </div>

        {/* Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-xl shadow-md mb-6"
        />

        {/* Category tag */}
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-6">
          {blog.category}
        </span>

        {/* Short description */}
        <p className="text-lg text-gray-700 italic mb-8">{blog.shortDesc}</p>

        {/* Long content */}
        <article className="text-gray-800 text-[17px] leading-8 whitespace-pre-line">
          {blog.longDesc}
        </article>
      </div>
      {/* Comment Part xxxxxxxxxxxxxxxxxxxxxxxxxxx */}
       <Comment
            blogId={blog._id}
            currentUser={user}
            existingComments={blog.comments}
            blogMail={blog.mail}
          ></Comment>
    </div>
  );
};

export default BlogDetails;
