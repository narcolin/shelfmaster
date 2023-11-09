import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Client";

const Menu = ({ active }) => {
  let navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="topnav">
      <a className={active === "Home" ? "active" : ""} href="/">
        Home
      </a>
      <a className={active === "Inventory" ? "active" : ""} href="/inventory">
        Inventory
      </a>
      <a className={active === "History" ? "active" : ""} href="/history">
        History
      </a>
      <a className={active === "Recipes" ? "active" : ""} href="/recipes">
        Recipes
      </a>
      <a href="">
        <span>&#9881;</span>
      </a>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Menu;
