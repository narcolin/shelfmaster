// import React from "react";
import Table from "../components/Table.js";
import InventoryDrawer from "../components/InventoryDrawer.js";

function Inventory(props) {
  return (
    <div>
      <div className="container">
        <InventoryDrawer />
        <Table inventoryData={props.inventoryData} />
      </div>
    </div>
  );
}
export default Inventory;
