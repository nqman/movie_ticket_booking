import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

export default function MainLayout() {
  return (
    <div>
      <Header />
      {/* BODY */}
      <Outlet />
      <Footer />
    </div>
  );
}
