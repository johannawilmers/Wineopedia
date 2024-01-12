import { Link } from "react-router-dom";
import "../styles/navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbarContent">
        <Link to={""}>HOME </Link>
        <Link to={"myfavorites"}> MY FAVORITES</Link>
      </div>
    </nav>
  );
}
