import Menu from "../components/Menu.js";
import sort from "../images/sort.jpeg";
import tally from "../images/tally.png";
import thumbs from "../images/thumbs.jpeg";

function Home() {
  return (
    <div>
      <Menu active="Home" />
      <div className="container">
        <h1>
          <br />
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
            <em>How to Use ShelfMaster</em>
          </h2>
          <br />
          <div className="row">
            <div className="column3">
              <p>
                <strong>Inventory</strong> allows users to add, edit, or delete
                items from their tally. Simplify keeping track of what you have
                in your pantry to avoid frustration at the grocery store!
              </p>
              <br />
              <img
                className="featimg"
                src={tally}
                width={150}
                height={150}
                style={{ alignSelf: "center" }}
              ></img>
            </div>
            <div className="column3">
              <p>
                <strong>Sort</strong> items in your inventory by food group to
                narrow the results in your inventory. Easily find and determine
                what you need for your next culinary creation!
              </p>
              <br />
              <img
                className="featimg"
                src={sort}
                width={170}
                height={140}
                style={{ alignSelf: "center" }}
              ></img>
            </div>
            <div className="column3">
              <p>
                <strong>Provide feedback</strong> to the team about your
                experience or learn about the purpose,background, and how
                ShelfMaster was created in the &quot;More&quot; dropdown.
              </p>
              <br />
              <img
                className="featimg"
                src={thumbs}
                width={150}
                height={150}
                style={{ alignSelf: "center" }}
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
