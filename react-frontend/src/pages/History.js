// import { Link } from "react-router-dom";
import Menu from "../components/Menu.js";
import Table from "../Table";

function History() {
  return (
    <div>
      <Menu active="History" />
      <div className="container">
        <h1>
          ShelfMaster <strong>History</strong>
        </h1>
        <br />
        <Table />
      </div>
    </div>
  );
}

export default History;
