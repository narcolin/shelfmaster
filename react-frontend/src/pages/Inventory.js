// import React from "react";
import Table from "../Table";
import InventoryDrawer from "../components/InventoryDrawer.js";

function Inventory(props) {
  return (
    <div>
      <div className="container">
        <h1>
          <br />
          ShelfMaster <strong>Inventory</strong>
        </h1>
        <InventoryDrawer />
        <br />
        <Table inventoryData={props.inventoryData} />
      </div>
    </div>
  );
}
export default Inventory;
