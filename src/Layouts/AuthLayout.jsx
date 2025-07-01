import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/NavBar";

const AuthLayout = () => {
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
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <NavBar isDark={isDark} toggleDarkMode={() => setIsDark((prev) => !prev)} />
      <main className="flex-grow">
        <Outlet context={{ isDark }} />
      </main>
    </div>
  );
};

export default AuthLayout;
