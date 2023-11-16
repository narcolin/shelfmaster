import Menu from "../components/Menu.js";
import placeholder from "../images/placeholder.png";

function Home() {
  return (
    <div>
      <Menu active="Home" />
      <div className="container">
        <h1>
          Welcome to <br />
          <strong>ShelfMaster</strong>
        </h1>
        <div className="row">
          <div className="column2">
            <p>
              ShelfMaster is for anyone and everyone who needs to keep track of
              their meals and make sure they have enough food to last.
              ShelfMaster is an inventory site that allows users to easily add
              or remove items from their tally. This product creatively formats
              your pantry items into food group categories, like grains,
              proteins, vegetables, etc.
              <br />
              <br />
              Get started by signing up or logging in.
              <br />
            </p>
          </div>
          <div className="column2">
            <a href="/login">
              <button className="gs-button">Get Started</button>
            </a>
          </div>
        </div>
        <hr />
        <br />
        <div className="container">
          <h2>
            <em>Features</em>
          </h2>
          <br />
          <div className="row">
            <div className="column3">
              <p>
                <strong>Inventory</strong> allows users to add, edit, or delete
                items from their tally. Sort items by their food group to assist
                your meal planning.
              </p>
              <br />
              <img
                className="featimg"
                src={placeholder}
                width={150}
                height={150}
              ></img>
            </div>
            <div className="column3">
              <p>
                <strong>History</strong> displays all items removed from the
                inventory. Users can view statistics about what their diet has
                consisted of over the past week.
              </p>
              <br />
              <img
                className="featimg"
                src={placeholder}
                width={150}
                height={150}
              ></img>
            </div>
            <div className="column3">
              <p>
                <strong>Recipes</strong> populates with possible meals users can
                make, based off the items in their inventory. Be creative in the
                kitchen!
              </p>
              <br />
              <img
                className="featimg"
                src={placeholder}
                width={150}
                height={150}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

//      <Link to='/inventory'>Inventory</Link>  //
//       <Link to='/login'>Login</Link> //
