import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";

function MyApp() {
  const location = useLocation();
  // Sets the initial title
  useEffect(() => {
    document.title = "Shelf Master";
  }, []);

  // Updates the title whenever location changes
  useEffect(() => {
    if (location.pathname === "/login") {
      document.title = "Login - Shelf Master";
    } else if (location.pathname === "/register") {
      document.title = "Register - Shelf Master";
    } else if (location.pathname === "/inventory") {
      document.title = "Inventory - Shelf Master";
    } else {
      document.title = "Shelf Master";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  );
}

export default MyApp;
