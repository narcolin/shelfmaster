// import { Link } from "react-router-dom";
import Menu from "../components/Menu.js";
import Table from "../Table";

function History() {
  return (
    <div className="container">
      <Menu active="History" />
      <h1>
        ShelfMaster <strong>History</strong>
      </h1>
      <br />
      <Table />
    </div>
  );
}

export default History;
