import Menu from "../components/Menu.js";

function Home() {
  return (
    <div className="container">
      <Menu active="Home" />
      <h1>
        Welcome to <br />
        <strong>ShelfMaster</strong>
      </h1>
      <p>
        ShelfMaster is for anyone and everyone who needs to keep track of their
        meals and make sure they have enough food to last. ShelfMaster is an
        inventory site that allows users to easily add or remove items from
        their tally. This product creatively formats your pantry items into food
        group categories, like grains, proteins, vegetables, etc.
        <br />
        <br />
      </p>
      <div className="row">
        <div className="column">
          <p>Get started with ShelfMaster by signing up or logging in.</p>
        </div>
        <div className="column">
          <a href="/login">
            <button className="gs-button">Get Started</button>
          </a>
          <br />
        </div>
        <p>
          Visit the Inventory tab to view what you have, or add or delete items.
          <br />
          View what you’ve used or eaten in the History tab.
          <br />
          The Recipes tab helps you curate recipe ideas based off what’s in your
          inventory.
          <br />
          <br />
        </p>
      </div>
    </div>
  );
}

export default Home;

//      <Link to='/inventory'>Inventory</Link>  //
//       <Link to='/login'>Login</Link> //
