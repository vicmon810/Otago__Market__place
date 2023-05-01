import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";

const Navbar = props => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <a className="navbar-brand text-info font-weight-bolder" href="/">
        <span className="">otagoMarketplace</span>
      </a>
      <button className ="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span className ="navbar-toggler-icon"></span>
      </button>
      <div className ={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarToggleExternalContent">
        <form className ="d-flex">
          <input className="form-control me-2" type="search" placeholder="search otagoMarketplace" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit"
          onClick={() => {
            //TODO: add search functionality;
          }}>Go</button>
        </form>
        <a className="nav-link text-info" href="/create">Add Listing</a>
        <a className="nav-link text-info" href="/login">Login</a>
        <a className="nav-link text-info" href="/register">Register</a>
        <a className="nav-link text-info" href="/profile">Profile</a>
      </div>
    </nav>
  );
}

export default Navbar;

//See: https://johnotu.medium.com/how-to-toggle-bootstrap-navbar-collapse-button-in-react-without-jquery-1d5c2fb0751c