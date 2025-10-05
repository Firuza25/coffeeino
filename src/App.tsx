import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AboutUs from "./components/AboutUs/AboutUs";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/shop" element={<div>Каталог кофе</div>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<div>Контакты</div>} />
      </Routes>
    </>
  );
};

export default App;
