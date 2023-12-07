import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import About from "./pages/About";
import axios from "axios";
import { supabase } from "./Client";
import Loading from "./pages/Loading";

function MyApp() {
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [shelf_user, setShelfUser] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  let dbChecked;

  const titleMap = {
    "/login": "Login - ShelfMaster",
    "/register": "Register - ShelfMaster",
    "/inventory": "Inventory - ShelfMaster",
    "/settings": "Settings - ShelfMaster",
    "/about": "About - ShelfMaster",
  };

  // sets token if session exists
  async function getSession() {
    const { data } = await supabase.auth.getSession();
    setToken(data.session?.access_token);
    setUser(data.session?.user);
  }

  async function getUserById(id) {
    try {
      const response = await axios.get(`http://localhost:8000/users/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async function addUser(id) {
    try {
      await axios.post("http://localhost:8000/users", {
        _id: id,
      });
    } catch (error) {
      // empty
    }
  }

  useEffect(() => {
    getSession();
    // updates token if sign in/out for rerender
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setAuthChecked(false);
          setToken(session.access_token);
          setUser(session.user);
          setTimeout(() => {
            setAuthChecked(true);
          }, 1000);
          // adds user to database if not already in (for social logins)
          if (session.provider_token && !dbChecked) {
            (async () => {
              const userData = await getUserById(session.user.id);
              if (!userData) {
                await addUser(session.user.id);
              }
            })();
          }
          dbChecked = true;
          break;
        case "SIGNED_OUT":
          setAuthChecked(false);
          setToken(null);
          setUser(null);
          dbChecked = false;
          setTimeout(() => {
            setAuthChecked(true);
          }, 1000);
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

  useEffect(() => {
    async function getShelfUser() {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${user?.id}`,
        );
        setShelfUser(response.data.users_list);
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    if (user !== null) {
      getShelfUser();
    }
  }, [user]);

  useEffect(() => {
    async function getItems(inventory_id) {
      try {
        const response = await axios.get(
          `http://localhost:8000/items?inventoryId=${inventory_id}`,
        );
        setInventory(response.data.inventory);
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    if (shelf_user !== null) {
      getItems(shelf_user.inventory);
    }
  }, [shelf_user]);

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
              element={
                <Inventory inventoryData={inventory} user={shelf_user} />
              }
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<Navigate to="/login" />} />
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
