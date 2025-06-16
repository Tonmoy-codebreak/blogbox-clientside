import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2563EB] text-white  font-main">
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
          <p className="text-sm text-gray-200">
            Your daily dose of blogs, ideas & stories. Read. Think. Grow.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/allblogs" className="hover:underline">All Blogs</Link></li>
            <li><Link to="/featuredblogs" className="hover:underline">Featured Blogs</Link></li>
            <li><Link to="/wishlist" className="hover:underline">Wishlist</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://support.google.com/"  target="_blank" className="hover:underline">Help Center</a></li>
            <li><a href="https://policies.google.com/terms?hl=en-US"  target="_blank" className="hover:underline">Terms of Service</a></li>
            <li><a href="https://policies.google.com/privacy?hl=en-US"  target="_blank" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="https://www.facebook.com/" target="_blank" className="hover:text-yellow-300"><FaFacebook /></a>
            <a href="https://x.com/" target="_blank" className="hover:text-yellow-300"><FaTwitter /></a>
            <a href="https://www.instagram.com/" target="_blank" className="hover:text-yellow-300"><FaInstagram /></a>
            <a href="https://www.linkedin.com/" target="_blank" className="hover:text-yellow-300"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-8 py-4 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} BlogBox. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
