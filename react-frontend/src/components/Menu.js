import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Client";
import logo from "../images/logo.png";

const Menu = ({ active }) => {
  let navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="navbar">
      <img className="logoimg" src={logo} width={250} height={37}></img>
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
      <div className="dropdown" onClick={toggleDropdown}>
        <button className="dropbtn">Settings &nbsp;&#x25BC;</button>
        <div className="dropdown-content" id="myDropdown">
          <a
            className={active === "Account Settings" ? "active" : ""}
            href="/settings"
          >
            Account Settings
          </a>
          <a className={active === "About" ? "active" : ""} href="/about">
            About
          </a>
          <a
            className={active === "Give Feedback" ? "active" : ""}
            href="https://forms.gle/9ScWE2BKYrrUnYVa9"
          >
            Give Feedback
          </a>
        </div>
      </div>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Menu;
