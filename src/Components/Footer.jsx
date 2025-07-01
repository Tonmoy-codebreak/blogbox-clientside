import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = ({ isDark }) => {
  const bgColor = isDark ? "bg-gray-900" : "bg-[#2563EB]";
  const textColor = isDark ? "text-gray-300" : "text-white";
  const borderColor = isDark ? "border-gray-700" : "border-white/20";
  const hoverColor = isDark ? "hover:text-blue-400" : "hover:text-yellow-300";
  const mutedText = isDark ? "text-gray-400" : "text-gray-200";

  return (
    <footer className={`${bgColor} ${textColor} font-main transition-colors duration-300  border-t-1 border-white`}>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://i.ibb.co/39cR051g/blogbox3.png"
              alt="logo"
              className="h-10"
            />
            <span className="text-2xl font-bold">BlogBox</span>
          </div>
          <p className={`text-sm ${mutedText}`}>
            Your daily dose of blogs, ideas & stories. Read. Think. Grow.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className={`hover:underline ${hoverColor}`}>Home</Link></li>
            <li><Link to="/allblogs" className={`hover:underline ${hoverColor}`}>All Blogs</Link></li>
            <li><Link to="/featuredblogs" className={`hover:underline ${hoverColor}`}>Featured Blogs</Link></li>
            <li><Link to="/wishlist" className={`hover:underline ${hoverColor}`}>Wishlist</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://support.google.com/" target="_blank" rel="noreferrer" className={`hover:underline ${hoverColor}`}>Help Center</a></li>
            <li><a href="https://policies.google.com/terms?hl=en-US" target="_blank" rel="noreferrer" className={`hover:underline ${hoverColor}`}>Terms of Service</a></li>
            <li><a href="https://policies.google.com/privacy?hl=en-US" target="_blank" rel="noreferrer" className={`hover:underline ${hoverColor}`}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className={`${hoverColor}`}><FaFacebook /></a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" className={`${hoverColor}`}><FaTwitter /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={`${hoverColor}`}><FaInstagram /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className={`${hoverColor}`}><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${borderColor} mt-8 py-4 text-center text-sm ${mutedText}`}>
        &copy; {new Date().getFullYear()} BlogBox. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
