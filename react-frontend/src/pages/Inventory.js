import React from "react";
import Table from "../Table";
import Menu from "../components/Menu.js";

function Inventory() {
  return (
    <div className="container">
      <Menu active="Inventory" />
      <h1>
        ShelfMaster <strong>Inventory</strong>
      </h1>
      <br />
      <Table />
    </div>
  );
}
export default Inventory;
