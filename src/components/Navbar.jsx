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
      <h2 className="navbar-title">AdvisoryApp</h2>
      <nav className="navbar-nav">
        <Link to="/" end>Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/exchange-rate">Exchange Rate</Link>
        <Link to="/market-data">Market Data</Link>
        <Link to="/advisory">Advisory</Link>
        <Link to="/watch-list">Watch List</Link>
        <Link to="/user-usermanagement">User Management</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      </div>
    </div>
    </>
  );
};

export default Navbar;

