import React from "react";
import Table from "../Table";
import Menu from "../components/Menu.js";

function Inventory() {
  return (
    <div className="container">
      <Menu active="Inventory" />
      <div className="container">
        <h1>
          ShelfMaster <strong>Inventory</strong>
        </h1>
        <br />
        <Table />
      </div>
    </div>
  );
}
export default Inventory;
