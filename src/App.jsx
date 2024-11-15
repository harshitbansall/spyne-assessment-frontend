import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Products />} />
      <Route path="/edit-product" element={<EditProduct />} />
    </Routes>
  );
};

export default App;
