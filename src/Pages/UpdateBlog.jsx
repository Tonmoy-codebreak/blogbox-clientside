import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

const UpdateBlog = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  // blog detailszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
  useEffect(() => {
    
    axiosSecure.get(`/blogs/${id}`)
     .then(res => {
      setBlog(res.data);
    });
  }, [id, axiosSecure]);

  // Submit updated blog
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updatedData = Object.fromEntries(form.entries());

    axiosSecure.patch(`/blogs/${id}`, updatedData)
      .then(res => {
        Swal.fire("Blog updated!", "", "success");
        navigate(`/blog/${id}`);
      })
      .catch(err => {
        Swal.fire("Failed to update blog", "", "error");
      });
  };

  if (!blog) return <p className="text-center py-20">Loading blog...</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 font-main">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-10">Update Blog</h1>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Blog Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Blog Title</label>
              <input
                type="text"
                name="title"
                defaultValue={blog.title}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                defaultValue={blog.image}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                name="category"
                defaultValue={blog.category}
                required
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="" disabled>Select a category</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="travel">Travel</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Short Desc */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Short Description</label>
              <textarea
                name="shortDesc"
                rows={3}
                defaultValue={blog.shortDesc}
                required
                className="w-full px-4 py-3 border rounded-lg"
              ></textarea>
            </div>

            {/* Long Desc */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Long Description</label>
              <textarea
                name="longDesc"
                rows={8}
                defaultValue={blog.longDesc}
                required
                className="w-full px-4 py-3 border rounded-lg"
              ></textarea>
            </div>

            <div className="text-center mt-8">
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
