// import { Link } from "react-router-dom";
import "./css/home.css";
import Menu from "../components/Menu.js";

function Recipes() {
  return (
    <div className="container">
      <Menu active="Recipes" />
      <h1>
        ShelfMaster <strong>Recipes</strong>
      </h1>
    </div>
  );
}

export default Recipes;
