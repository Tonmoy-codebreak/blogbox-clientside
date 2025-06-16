import React from "react";
import { motion } from "framer-motion";

const LastSection = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfDB8MHx8fDI%3D",
      label: "Tech",
    },
    {
      src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGhlYWx0aHxlbnwwfDB8MHx8fDI%3D",
      label: "Health",
    },
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3N8ZW58MHwwfDB8fHwy",
      label: "Business",
    },
    {
      src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VHJhdmVsfGVufDB8MHwwfHx8Mg%3D%3D",
      label: "Travel",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 md:py-20 font-main">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12"
      >
        Discover Diverse Perspectives
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 items-start">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:col-span-1 bg-blue-50 rounded-3xl p-8 shadow-lg h-full"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Thoughtful Reads. Fresh Views.
          </h3>
          <div className="text-gray-700 text-[17px] space-y-8 leading-relaxed">
            <p>
              At BlogBox, we believe that every article is more than just information—it's a doorway to new perspectives and a deeper understanding of the world around us. Our content spans innovation, creativity, and real-life stories that resonate.
            </p>
            <p>
              We don’t just follow trends—we explore the ideas behind them. Our stories inform, inspire, and build meaningful connections with readers from all walks of life.
            </p>
            <p>
              What sets BlogBox apart is our dedication to depth and authenticity. Every post is crafted with passion, purpose, and a desire to spark curiosity.
            </p>
          </div>
        </motion.div>

        {/* Refined Image Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:col-span-2 flex flex-col gap-4"
        >
          {/* First row: 2 images side by side */}
          <div className="grid grid-cols-2 gap-4">
            {images.slice(0, 2).map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-2xl overflow-hidden shadow-md relative group"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-3 left-3 bg-white/80 text-sm px-3 py-1 rounded-full text-blue-700 font-medium shadow-md">
                  {img.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row: full width image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-2xl overflow-hidden shadow-md relative group"
          >
            <img
              src={images[2].src}
              alt={images[2].label}
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-3 left-3 bg-white/80 text-sm px-3 py-1 rounded-full text-blue-700 font-medium shadow-md">
              {images[2].label}
            </div>
          </motion.div>

          {/* Third row: full width image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-2xl overflow-hidden shadow-md relative group"
          >
            <img
              src={images[3].src}
              alt={images[3].label}
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-3 left-3 bg-white/80 text-sm px-3 py-1 rounded-full text-blue-700 font-medium shadow-md">
              {images[3].label}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LastSection;
