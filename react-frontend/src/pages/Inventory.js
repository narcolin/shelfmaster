import React from "react";
import Table from "../components/Table.js";
import InventoryDrawer from "../components/InventoryDrawer.js";

function Inventory(props) {
  const [filters, setFilters] = React.useState({
    Grains: false,
    Fruits: false,
    Vegetables: false,
    Proteins: false,
    Dairy: false,
    Beverages: false,
    Miscellaneous: false,
  });

  return (
    <div>
      <div className="container">
        <InventoryDrawer filters={filters} setFilters={setFilters} />
        <Table
          inventoryData={props.inventoryData}
          user={props.user}
          filters={filters}
        />
      </div>
    </div>
  );
}
export default Inventory;
