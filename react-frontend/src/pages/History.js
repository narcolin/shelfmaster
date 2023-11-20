// import { Link } from "react-router-dom";
import Menu from "../components/Menu.js";
import Table from "../components/Table.js";

function History() {
  return (
    <div>
      <Menu active="History" />
      <div className="container">
        <h1>
          <br />
          ShelfMaster <strong>History</strong>
        </h1>
        <br />
        <Table />
      </div>
    </div>
  );
}

export default History;
