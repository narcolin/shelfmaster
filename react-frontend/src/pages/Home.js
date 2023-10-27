import { Link } from "react-router-dom";
function Home() {  
  return (
    <div className="container">
      <h1>home</h1>
      <Link to='/inventory'>Inventory</Link>
      <Link to='/login'>Login</Link>
    </div>
  )
}

export default Home;