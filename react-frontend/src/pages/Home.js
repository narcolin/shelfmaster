import { Link } from "react-router-dom";
import "./css/home.css";

function Home() {  
  return (
    <div className="container">
      <div class="topnav">
        <a class="active" href="#home">Home</a>
        <a href="">Inventory</a>
        <a href="">History</a>
        <a href="">Recipes</a>
        <a href=""><span>&#9881;</span></a>
      </div>
      <h1>Welcome to <br /><strong>ShelfMaster</strong></h1>
      <p>Use ShelfMaster to keep track of what food items you have. <br />
            Visit the Inventory tab to view what you have, or add or delete items.<br />
            View what you’ve used or eaten in the History tab.<br />
            The Recipes tab helps you curate recipe ideas based off what’s in your inventory.<br /></p>
      <div class="row">
        <div class="column">
        <p>Get started with ShelfMaster by signing up or logging in.</p>
        </div>
        <div class="column">
          <a href=""><button class="gs-button">Get Started</button></a>
        </div>
      </div>
    </div>
  )
}

export default Home;

//      <Link to='/inventory'>Inventory</Link>  //
//       <Link to='/login'>Login</Link> //