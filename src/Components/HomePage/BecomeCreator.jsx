import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiBookOpenText } from "react-icons/pi";
import { BiAward, BiTargetLock } from "react-icons/bi";
import { GiLightBulb } from "react-icons/gi";

const BecomeCreator = ({ isDark }) => {
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
    <section
      className={`py-24 px-6 md:px-12 font-inter transition-colors duration-300
        ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}
      `}
    >
      {/* Title */}
      <h2
        className={`text-4xl md:text-5xl font-bold font-title text-center mb-16 ${
          isDark ? "text-blue-400" : "text-blue-600"
        }`}
      >
        Frequently Asked Questions
      </h2>

      {/* Layout Grid */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Image Section (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 w-full"
        >
          <img
            src="https://i.ibb.co/VWSVfW7s/blogbox-cover.png"
            alt="BlogBox"
            className="rounded-2xl shadow-2xl w-full h-full object-cover"
          />
        </motion.div>

        {/* Tabs + Accordion (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          {/* FAQ Buttons */}
          <div className="flex flex-wrap gap-3 mb-6 justify-start">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`py-3 px-4 text-sm sm:text-base font-semibold transition-all duration-300 rounded-xl focus:outline-none ${
                  activeTab === index
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : isDark
                    ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>

          {/* Accordion Answer */}
          <div
            className={`rounded-2xl shadow-md border overflow-hidden min-h-[200px] transition-colors duration-300
              ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-white border-gray-100 text-gray-900"
              }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-6"
              >
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  {faqs[activeTab].icon}
                  {faqs[activeTab].question}
                </h3>
                <p className="leading-relaxed text-base">{faqs[activeTab].answer}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeCreator;
