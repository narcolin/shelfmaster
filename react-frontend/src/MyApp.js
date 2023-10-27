import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Inventory from './pages/Inventory'

function MyApp() {  
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/login" element={<Login />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  )
}


export default MyApp;