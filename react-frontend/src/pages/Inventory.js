// import React from "react";
import Table from "../Table";
import InventoryDrawer from "../components/InventoryDrawer.js";

function Inventory() {
  return (
    <div>
      <div className="container">
        <h1>
          ShelfMaster <strong>Inventory</strong>
        </h1>
        <InventoryDrawer />
        <br />
        <Table />
      </div>
    </div>
  );
}
export default Inventory;
