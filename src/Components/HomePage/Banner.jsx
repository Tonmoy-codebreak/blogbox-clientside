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

            <motion.div
  className="group"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
>
  <motion.button
    onClick={handleExplore}
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.7)" }}
    whileTap={{ scale: 0.97 }}
    className="w-auto p-3 flex items-center justify-start gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-full cursor-pointer transition-all duration-500 shadow-[5px_5px_10px_rgba(0,0,0,0.116)] pl-2"
  >
    <svg
      className="h-[25px] transition-transform duration-[1500ms] group-hover:rotate-[250deg]"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
        fill="white"
      />
    </svg>
    Explore Blogs
  </motion.button>
</motion.div>




          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
