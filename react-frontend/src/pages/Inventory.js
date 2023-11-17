// import React from "react";
import React, { useState } from "react";
import Table from "../Table";
import InventoryDrawer from "../components/InventoryDrawer.js";

import IconButton from "@mui/icons-material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function Inventory(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  <IconButton
    edge="start"
    color="inherit"
    aria-label="menu"
    onClick={toggleDrawer}
    style={{ position: "absolute", left: 0, top: 0 }}
  >
    <MenuIcon />
  </IconButton>;

  return (
    <div>
      <div className="container">
        <h1>
          ShelfMaster <strong>Inventory</strong>
        </h1>
        <InventoryDrawer />
        {/* <Drawer open={drawerOpen} /> */}
        <br />
        <Table inventoryData={props.inventoryData} />
      </div>
    </div>
  );
}
export default Inventory;
