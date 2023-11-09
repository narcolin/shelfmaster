import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import History from "./pages/History";
import Recipes from "./pages/Recipes";
import { supabase } from "./Client";
import Loading from "./pages/Loading";

function MyApp() {
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const titleMap = {
    "/login": "Login - Shelf Master",
    "/register": "Register - Shelf Master",
    "/inventory": "Inventory - Shelf Master",
    "/history": "History - Shelf Master",
    "/recipes": "Recipes - Shelf Master",
  };

  useEffect(() => {
    // updates the session storage if log in/out
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          sessionStorage.setItem("token", session.access_token);
          break;
        case "SIGNED_OUT":
          sessionStorage.removeItem("token");
          localStorage.removeItem("token");
          break;
        default:
      }
      // keeps the user logged in/out
      if (sessionStorage.getItem("token") || localStorage.getItem("token")) {
        setToken(
          sessionStorage.getItem("token") || localStorage.getItem("token"),
        );
      }
      // used to render blank screen so it doesn't have page flash
      // TODO: probably better to only use when have to do api calls
      setTimeout(() => {
        setAuthChecked(true);
      }, 1000);
    });
  }, []);

  // Updates the title whenever location changes
  useEffect(() => {
    document.title = titleMap[location.pathname] || "Shelf Master";
  }, [location.pathname]);

  return (
    <Routes>
      {authChecked ? (
        token ? (
          <>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Navigate to="/inventory" />} />
            <Route path="/register" element={<Navigate to="/inventory" />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/history" element={<History />} />
            <Route path="/recipes" element={<Recipes />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<Navigate to="/login" />} />
            <Route path="/history" element={<Navigate to="/login" />} />
            <Route path="/recipes" element={<Navigate to="/login" />} />
          </>
        )
      ) : (
        <Route path={location.pathname} element={<Loading />} />
      )}
    </Routes>
  );
}

export default MyApp;
