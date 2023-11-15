import React from "react";
//import React, { useState } from "react";
import Table from "../Table";
import Drawer from "../Drawer";
import Menu from "../components/Menu.js";

// import IconButton from "@mui/icons-material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

function Inventory() {
  // const [drawerOpen, setDrawerOpen] = useState(false);

  // const toggleDrawer = () => {
  //   setDrawerOpen(!drawerOpen);
  // };

  // <IconButton
  //   edge="start"
  //   color="inherit"
  //   aria-label="menu"
  //   onClick={toggleDrawer}
  //   style={{ position: "absolute", left: 0, top: 0 }}
  // >
  //   <MenuIcon />
  // </IconButton>;

  return (
    <div className="container">
      <Menu active="Inventory" />
      <h1>
        ShelfMaster <strong>Inventory</strong>
      </h1>
      <Drawer />
      {/* <Drawer open={drawerOpen} /> */}
      <br />
      <Table />
    </div>
  );
}
export default Inventory;
