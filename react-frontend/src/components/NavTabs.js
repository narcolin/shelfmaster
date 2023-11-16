import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation } from "react-router-dom";

const pages = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "History", href: "/history" },
  { label: "Recipes", href: "/recipes" },
];

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        if (props.href === location.pathname) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

function getTabIndex(pathname) {
  const index = pages.findIndex((page) => page.href === pathname);
  return index !== -1 ? index : null;
}

export default function NavTabs() {
  const location = useLocation();
  const [value, setValue] = React.useState(getTabIndex(location.pathname));

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== "click" ||
      (event.type === "click" && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        textAlign: "left",
        marginLeft: 3,
        marginRight: 3,
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        {pages.map((page, index) => (
          <LinkTab
            key={index}
            label={page.label}
            href={page.href}
            sx={{
              marginLeft: 2,
              marginRight: 2,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
