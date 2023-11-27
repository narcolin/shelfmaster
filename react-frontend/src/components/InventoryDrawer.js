import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import CheckIcon from "@mui/icons-material/Check";
import { Tooltip } from "@mui/material";
import logo from "../images/logo.png";
import Recipes from "../pages/Recipes.js";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//need to fix app bar display (drawer menu button)
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: "84px",
  backgroundColor: "#333",
  justifyContent: "center",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function InventoryDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = useState({
    Grains: false,
    Fruits: false,
    Vegetables: false,
    Proteins: false,
    Dairy: false,
    Beverages: false,
    Miscellaneous: false,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
    const button = document.activeElement;
    if (button instanceof HTMLElement) {
      button.blur();
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
    const button = document.activeElement;
    if (button instanceof HTMLElement) {
      button.blur();
    }
  };

  function handleFilterToggle(text) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [text]: !prevFilters[text],
    }));
    console.log(filters);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ paddingLeft: open ? "10px !important" : "" }}>
          {open ? (
            <></>
          ) : (
            <Tooltip title="Expand">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  "&:hover": {
                    backgroundColor: "#9e9e9e",
                  },
                  color: "white",
                }}
              >
                <MenuIcon color="inherit" />
              </IconButton>
            </Tooltip>
          )}
          <Link to="/">
            {" "}
            <img className="logoimg" src={logo} width={250} height={37}></img>
          </Link>
          <Recipes />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ minHeight: "84px !important" }}>
          {open ? (
            <div>
              <Link to="/">
                <a>return?</a>
              </Link>
              <Tooltip title="Collapse">
                <IconButton
                  onClick={handleDrawerClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                    color: "#757575",
                  }}
                >
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon color="inherit" />
                  ) : (
                    <ChevronLeftIcon color="inherit" />
                  )}
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <></>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Grains",
            "Fruits",
            "Vegetables",
            "Proteins",
            "Dairy",
            "Beverages",
            "Miscellaneous",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: filters[text] ? "#e0e0e0" : "transparent",
                }}
                onClick={() => handleFilterToggle(text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                {open && filters[text] ? (
                  <>
                    <CheckIcon sx={{ color: "#757575" }} />
                  </>
                ) : (
                  <></>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <AccountSettings />
      </Drawer>
    </Box>
  );
}
