import React from "react";
import { useNavigate } from "react-router";

const Banner = () => {
    const navigate = useNavigate()
    const handleExplore = () =>{
        navigate("/allblogs")
    }
  return (
    <div className="py-10 rounded-2xl overflow-hidden font-main">
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
        <div className="relative z-20 flex items-center justify-center w-full h-full text-center text-neutral-content px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold font-main leading-tight mb-6">
              Welcome to <span className="">BlogBox</span>
            </h1>
            <p className="mb-8 font-main text-lg md:text-xl text-gray-200">
              Your daily dose of ideas, stories, and insights. Dive into thought-provoking articles written by passionate minds.
            </p>
            <button onClick={handleExplore} className="btn bg-blue-600 text-white rounded-4xl border-0 shadow-md hover:scale-105 transition-transform duration-300">
              Explore Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
