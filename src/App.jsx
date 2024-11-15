import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from "react-router-dom";

////////////////////////////////////////////////////////////////

import Login from "./pages/Login";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

////////////////////////////////////////////////////////////////

const App = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  ////////////////////////////////////

  useEffect(() => {
    if (cookies.get("access_token")) {
    } else {
      navigate("/login");
    }
  }, [cookies.get("access_token")]);

  /////////////////////////////////////

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Products />} />
      <Route path="/edit-product" element={<EditProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default App;
