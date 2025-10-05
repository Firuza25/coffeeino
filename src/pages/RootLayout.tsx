import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import CartDrawer from "../components/CartDrawer/CartDrawer";

const RootLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "20px", minHeight: "80vh" }}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
