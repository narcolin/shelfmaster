// import { Link } from "react-router-dom";
import Menu from "../components/Menu.js";

function About() {
  return (
    <div>
      <Menu active="About" />
      <div className="container">
        <h1>
          <br />
          About <strong>ShelfMaster</strong>
        </h1>
        <br />
        <br />
        <p>
          ShelfMaster is a product of a Cal Poly San Luis Obispo project in
          Computer Science. For CSC 307 (Intro to Software Engineering),
          students were instructed to build simple interfaces using front-end
          and back-end tools. <br />
          <br />
          The front-end content is configured with React components. With the
          help of Material UI, we created a simple and user-friendly approach to
          an inventory. We used Express .js framework for Node in the back-end,
          paired with an Atlas database to store user credentials and inventory
          data. <br />
          <br />
          <strong>Contributors:</strong>
          <br />
          - Carl Opem <br />
          - Dennis Phun <br />
          - Gordon Luu <br />
          - Nicole Arcolino <br />
        </p>
      </div>
    </div>
  );
}

export default About;
