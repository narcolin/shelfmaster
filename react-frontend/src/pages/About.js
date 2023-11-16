// import { Link } from "react-router-dom";
import Menu from "../components/Menu.js";

function About() {
  return (
    <div>
      <Menu active="About" />
      <div className="container">
        <h1>
          About <strong>ShelfMaster</strong>
        </h1>
      </div>
    </div>
  );
}

export default About;
