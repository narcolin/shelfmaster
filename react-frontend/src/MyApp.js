import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import History from "./pages/History";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import About from "./pages/About";
import axios from "axios";
import { supabase } from "./Client";
import Loading from "./pages/Loading";

function MyApp() {
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const titleMap = {
    "/login": "Login - ShelfMaster",
    "/register": "Register - ShelfMaster",
    "/inventory": "Inventory - ShelfMaster",
    "/history": "History - ShelfMaster",
    "/recipes": "Recipes - ShelfMaster",
    "/settings": "Settings - ShelfMaster",
    "/about": "About - ShelfMaster",
  };

  // sets token if session exists
  async function getSession() {
    const { data } = await supabase.auth.getSession();
    setToken(data.session?.access_token);
    setUser(data.session?.user);
  }

  useEffect(() => {
    getSession();
    // updates token if sign in/out for rerender
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setToken(session.access_token);
          setUser(session.user);
          break;
        case "SIGNED_OUT":
          setToken(null);
          setUser(null);
          break;
        default:
          setToken(null);
          setUser(null);
          break;
      }
    });
    // used to render blank screen so it doesn't have page flash
    // TODO: probably better to only use when have to do api calls
    setTimeout(() => {
      setAuthChecked(true);
    }, 1000);
  }, []);

  // Updates the title whenever location changes
  useEffect(() => {
    document.title = titleMap[location.pathname] || "Shelf Master";
  }, [location.pathname]);

  // Get user information from database
  async function getUser() {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/${user.id}`,
      );
      return response.data.users_list;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Get inventory information from database
  async function getItems(inventory_id) {
    try {
      const items = await axios.get(
        `http://localhost:8000/items?inventoryId=${inventory_id}`,
      );
      return items.data.inventory;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // If supabase user is there, get the database user information to get all items
  useEffect(() => {
    getUser().then((result) => {
      if (result) {
        setInventory(getItems(result.inventory));
      }
    });
  }, [user]);

  return (
    <Routes>
      {authChecked ? (
        token ? (
          <>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Navigate to="/inventory" />} />
            <Route path="/register" element={<Navigate to="/inventory" />} />
            <Route
              path="/inventory"
              element={<Inventory inventoryData={inventory} />}
            />
            <Route path="/history" element={<History />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<Navigate to="/login" />} />
            <Route path="/history" element={<Navigate to="/login" />} />
            <Route path="/recipes" element={<Navigate to="/login" />} />
            <Route path="/settings" element={<Navigate to="/login" />} />
            <Route path="/about" element={<Navigate to="/login" />} />
          </>
        )
      ) : (
        <Route path={location.pathname} element={<Loading />} />
      )}
    </Routes>
  );
}

export default MyApp;
