import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import History from "./pages/History";
import Recipes from "./pages/Recipes";
import { supabase } from "./Client";

function MyApp() {
  const location = useLocation();
  const [token, setToken] = useState(false);

  useEffect(() => {
    // keeps the user logged in/out
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          sessionStorage.setItem("token", session.access_token);
          break;
        case "SIGNED_OUT":
          sessionStorage.removeItem("token");
          break;
        default:
      }
      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"));
      }
    });

    // sets title
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
    } else if (location.pathname === "/history") {
      document.title = "History - Shelf Master";
    } else if (location.pathname === "/recipes") {
      document.title = "Recipes - Shelf Master";
    } else {
      document.title = "Shelf Master";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route
        path="/login"
        element={token ? <Navigate to="/inventory" /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/inventory" /> : <Register />}
      />
      <Route
        path="/inventory"
        element={token ? <Inventory /> : <Navigate to="/login" />}
      />
      <Route
        path="/history"
        element={token ? <History /> : <Navigate to="/history" />}
      />
      <Route
        path="/recipes"
        element={token ? <Recipes /> : <Navigate to="/recipes" />}
      />
    </Routes>
  );
}

export default MyApp;
