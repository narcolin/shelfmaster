// import { Link } from "react-router-dom";
import Menu from "../components/Menu.js";

function Recipes() {
  return (
    <div>
      <Menu active="Recipes" />
      <div className="container">
        <h1>
          <br />
          ShelfMaster <strong>Recipes</strong>
        </h1>
      </div>
    </div>
  );
}

export default Recipes;
