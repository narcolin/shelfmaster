import { Link } from "react-router-dom";
import "./css/home.css";
import Menu from '../components/Menu.js'

function History() {  
  return (
    <div className="container">
      <Menu active = "History"/>
      <h1>ShelfMaster <strong>History</strong></h1>
    </div>
  )
}

export default History;