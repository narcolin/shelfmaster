import React from 'react';

function Menu() {
  return (
    <div class="topnav">
      <a class="active" href="/">Home</a>
      <a href="/inventory">Inventory</a>
      <a href="">History</a>
      <a href="/recipes">Recipes</a>
      <a href=""><span>&#9881;</span></a>
    </div>
  );
};

export default Menu;
