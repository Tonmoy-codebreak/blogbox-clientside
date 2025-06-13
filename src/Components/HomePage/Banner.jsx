import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/allblogs");
  };

  return (
    <div className="overflow-hidden font-main">
      <div
        className="hero min-h-[70vh] relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1657639028182-24e11504c7c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center w-full h-full text-left text-neutral-content px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold font-main leading-tight mb-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome to <span className="">BlogBox</span>
            </motion.h1>

            <motion.p
              className="mb-8 font-main text-lg md:text-xl text-gray-200"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Your daily dose of fresh ideas and inspiring blogs. Explore meaningful insights that spark curiosity and growth. Dive into thought-provoking articles crafted with passion. Fuel your mind — one story, one idea, one moment at a time.
            </motion.p>

            <motion.button
              onClick={handleExplore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-blue-600 text-white rounded-4xl border-0 shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Explore Blogs
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
