import React from "react";
import "./css/inventory.css";
import Table from "../Table";
import Menu from "../components/Menu.js";

function Inventory() {
  return (
    <div className="container">
      <Menu active="Inventory" />
      <div className="container">
        <h1>
          ShelfMaster <strong>Inventory</strong>
        </h1>
        <br />
        <Table />
      </div>

      <div className="column">
        <div className="column">
          <a href="">
            <button className="cc-button">Custom Food Category</button>
          </a>
          <a href="">
            <button className="ei-button">Edit Inventory</button>
          </a>
        </div>
      </div>
    </div>
  );
}

// function TableHeader() {
//   return (
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Name</th>
//         <th>Job</th>
//         <th>Remove</th>
//       </tr>
//     </thead>
//   );
// }

// function TableBody(props) {
//   const rows = props.characterData.map((row, index) => {
//     return (
//       <tr key={index}>
//         <td>{row._food}</td>
//         <td>{row.quantitypurchased}</td>
//         <td>{row.datepurchased}</td>
//         <td>{row.quantityleft}</td>
//         <td>
//           <button onClick={() =>
//             props.removeCharacter(index)}>
//             Delete
//           </button>
//         </td>
// 	    </tr>
//     );
//    }
//   );
//   return (
//       <tbody>
//         {rows}
//        </tbody>
//    );
// }

// function Table (props) {
//   return (
//     <table>
//       <Inventory />
//       <TableBody characterData={props.characterData}
// 	      removeCharacter={props.removeCharacter} />
//     </table>
//   );
// }

export default Inventory;
