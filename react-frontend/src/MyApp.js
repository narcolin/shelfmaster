import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";

function MyApp() {
  const location = useLocation();

  const [token, setToken] = useState(false);

  // sets token for authorization
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  // on render
  useEffect(() => {
    // saves token until logout
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
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
    } else {
      document.title = "Shelf Master";
    }
  }, [location.pathname]);

  console.log(token);

  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route
        path="/login"
        element={
          token ? <Navigate to="/inventory" /> : <Login setToken={setToken} />
        }
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/inventory" /> : <Register />}
      />
      <Route
        path="/inventory"
        element={token ? <Inventory /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default MyApp;
