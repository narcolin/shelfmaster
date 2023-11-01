import React from "react";
import "./css/inventory.css";
import Table from "../Table";


function Inventory() {  
  return (
    <div className="container">
        <div class="topnav">
        <a href="">Home</a>
        <a class="active" href="#inventory">Inventory</a>
        <a href="">History</a>
        <a href="">Recipes</a>
        <a href=""><span>&#9881;</span></a>
      </div>
      <div className="container">
        <Table />
      </div>

      <div class="column">
        <div class="column">
          <a href=""><button class="cc-button">Custom Food Category</button></a>
          <a href=""><button class="ei-button">Edit Inventory</button></a>
          </div>
          </div>
        </div>
  )
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