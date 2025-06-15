import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
    
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
