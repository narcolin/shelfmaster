// import { Link } from "react-router-dom";
import Menu from "../components/Menu.js";

function Settings() {
  return (
    <div>
      <Menu active="Settings" />
      <div className="container">
        <h1>
          ShelfMaster <strong>Settings</strong>
        </h1>
      </div>
    </div>
  );
}

export default Settings;
