import React from "react";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../Auth/useAuth";
import { useNavigate, useOutletContext } from "react-router";

const AddBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { isDark } = useOutletContext(); // ✅ dark mode context

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    const totalData = {
      ...data,
      name: user?.displayName,
      mail: user?.email,
      comments: [],
      wishlisted: [],
      createdAt: new Date().toISOString(),
    };

    axiosSecure.post("/addblog", totalData).then(() => {
      Swal.fire({
        title: "Blog Added!",
        icon: "success",
      });
      navigate("/");
    });
  };

  return (
    <div className={`min-h-screen py-12 font-main transition-colors duration-300 ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-black"}`}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`p-8 rounded-2xl shadow-xl ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
          <h1 className="text-3xl sm:text-4xl font-bold font-main text-center mb-10 text-blue-700 ">
            Add New Blog
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block font-semibold mb-2">Blog Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g., How AI Is Changing the World"
                className={`w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? "bg-gray-800 border-gray-600 text-white" : "border border-gray-300"}`}
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block font-semibold mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                required
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? "bg-gray-800 border-gray-600 text-white" : "border border-gray-300"}`}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-2">Category</label>
              <select
                name="category"
                defaultValue=""
                required
                className={`w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? "bg-gray-800 border-gray-600 text-white" : "border border-gray-300"}`}
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

            {/* Short Description */}
            <div>
              <label className="block font-semibold mb-2">Short Description</label>
              <textarea
                name="shortDesc"
                rows={3}
                required
                placeholder="Write a quick summary of your blog..."
                className={`w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? "bg-gray-800 border-gray-600 text-white" : "border border-gray-300"}`}
              ></textarea>
            </div>

            {/* Long Description */}
            <div>
              <label className="block font-semibold mb-2">Long Description</label>
              <textarea
                name="longDesc"
                rows={8}
                required
                placeholder="Write your full blog content here..."
                className={`w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? "bg-gray-800 border-gray-600 text-white" : "border border-gray-300"}`}
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700  text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
              >
                Submit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;
