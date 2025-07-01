import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const NewsLetter = ({ isDark }) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      return Swal.fire("Oops!", "Please enter your email address", "warning");
    }

    Swal.fire("Subscribed!", "Thanks for joining our newsletter.", "success");
    setEmail("");
  };

  return (
    <div className={`py-20 transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <h1
        className={`text-center text-5xl font-semibold font-title mb-10 ${
          isDark ? "text-blue-400" : "text-blue-600"
        }`}
      >
        Newsletter
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`w-11/12 max-w-7xl mx-auto my-16 rounded-xl overflow-hidden flex flex-col md:flex-row font-main shadow-lg ${
          isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2"
        >
          <img
            src="https://i.ibb.co/qMFNgvnF/newsletter.png"
            alt="Newsletter"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`md:w-1/2 p-8 flex flex-col justify-center ${
            isDark ? "bg-gray-700" : "bg-blue-50"
          }`}
        >
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Stay Updated
          </h2>

          <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <strong>Why subscribe to our newsletter?</strong>
            <br />
            Be the first to know about fresh blog posts, insights, and exclusive tips to spark your creativity.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-gray-800 text-white border border-gray-600 focus:ring-blue-500 placeholder:text-gray-400"
                  : "border border-gray-300 focus:ring-blue-600"
              }`}
            />

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NewsLetter;
