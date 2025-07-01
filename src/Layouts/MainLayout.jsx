import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <NavBar isDark={isDark} toggleDarkMode={() => setIsDark((prev) => !prev)} />
      <main className="flex-grow">
        <Outlet context={{ isDark }} />
      </main>
      <Footer isDark={isDark} toggleDarkMode={()=> setIsDark((prev) => !prev)} />
    </div>
  );
};

export default MainLayout;
