import React from "react";

const Menu = ({ active }) => {
  return (
    <div className="topnav">
      <a className={active === "Home" ? 'active' : ''} href="/">Home</a>
      <a className={active === "Inventory" ? 'active' : ''} href="/inventory">Inventory</a>
      <a className={active === "History" ? 'active' : ''} href="/history">History</a>
      <a className={active === "Recipes" ? 'active' : ''} href="/recipes">Recipes</a>
      <a href=""><span>&#9881;</span></a>
    </div>
  );
}

export default Menu;
