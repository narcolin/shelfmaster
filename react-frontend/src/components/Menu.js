import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Client";
import logo from "../images/logo.png";
import NavTabs from "./NavTabs";

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
    <div>
      <div className="navbar">
        <img className="logoimg" src={logo} width={250} height={37}></img>
        <NavTabs />
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
    </div>
  );
};

export default Menu;
