import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiBookOpenText } from "react-icons/pi";
import { BiAward, BiTargetLock } from "react-icons/bi";
import { GiLightBulb } from "react-icons/gi";

const BecomeCreator = () => {
  const [activeTab, setActiveTab] = useState(0);

  const faqs = [
    {
      question: "What is BlogBox?",
      answer:
        "BlogBox is your dedicated platform for sharing ideas, stories, and expertise. It's a vibrant community where writers, thinkers, and creators connect and grow, offering a seamless publishing experience.",
      icon: <PiBookOpenText className="w-6 h-6 text-blue-600" />,
    },
    {
      question: "Why use BlogBox?",
      answer:
        "BlogBox offers intuitive tools, a supportive community, and robust features to help your content reach a wider audience.",
      icon: <BiTargetLock className="w-6 h-6 text-blue-600" />,
    },
    {
      question: "What does BlogBox offer?",
      answer:
        "We provide easy-to-use publishing tools, powerful analytics to track your impact, discovery features to connect with readers, and a secure, reliable environment for all your creative endeavors.",
      icon: <BiAward className="w-6 h-6 text-blue-600" />,
    },
    {
      question: "How do I start writing?",
      answer:
        "Simply create your account by clicking 'Start Blogging Now'. You'll then be guided through our streamlined process, enabling you to publish your first compelling post in just minutes!",
      icon: <GiLightBulb className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <section className="bg-gray-50 md:py-20 px-6 mt-32 font-inter">
      {/* Title Centered on Top */}
      <h2 className="text-4xl md:text-5xl font-bold font-title text-center pb-10 text-blue-600 mb-12">
        Frequently Asked Questions
      </h2>

      {/* Grid Section: Image + Accordion */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Image */}
        <div className="w-full flex justify-center h-full">
          <img
            src="https://i.ibb.co/VWSVfW7s/blogbox-cover.png"
            alt="BlogBox Cover"
            className="rounded-2xl shadow-2xl w-full h-full object-cover duration-500"
          />
        </div>

        {/* Right: Accordion */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-xl mx-auto"
        >
          {/* Tab Headers */}
          <div className="flex flex-wrap gap-3 mb-6">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 min-w-[120px] py-3 px-5 text-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-blue-600 text-white shadow-md rounded-xl"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-xl"
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>

          {/* Animated Accordion Content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-6 flex flex-col items-center justify-center text-gray-700 text-base text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                    {faqs[activeTab].icon}
                    {faqs[activeTab].question}
                  </h3>
                  <p className="leading-relaxed">{faqs[activeTab].answer}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeCreator;
