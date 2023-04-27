import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";

const Navbar = props => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <a class="navbar-brand text-info font-weight-bolder" href="/">
        <span className="">otagoMarketplace</span>
      </a>
      <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarToggleExternalContent">
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="search otagoMarketplace" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit"
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