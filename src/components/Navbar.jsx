import { Link } from "react-router-dom";
import "./Navbar.css"
import Doydev from "../assets/doydev.png"



const Navbar = () => {
  
  return (

    <>
    <div className="NavUp">
      <div className= "Logo">
      <img src= {Doydev} alt="Logo" />
      </div>
    <div className="navbar">
      <h2 className="navbar-title">Investment Advisory App</h2>
      <nav className="navbar-nav">
        <Link to="/" end>Overview</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/about">About</Link>
        <Link to="/analytics">Analytics</Link>
      </nav>
      </div>
    </div>
    </>
  );
};

export default Navbar;

