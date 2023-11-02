import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MyApp from "./MyApp";
import "./index.css";

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
root.render(
  <BrowserRouter basename="/">
    <MyApp />
  </BrowserRouter>,
);
