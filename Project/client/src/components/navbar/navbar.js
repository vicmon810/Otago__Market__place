import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ".//../../CSS/navbar.css";

const Navbar = (props) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]); // state variable to store search results

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  console.log(props);
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated")
  );
  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("currUser");
    window.location.href = "/";
    const home = window.location.href;
  };
  const getUser = () => {
    const user = localStorage.getItem("currUser");
    console.log(user);
    const name = JSON.parse(user).name; //current login user
    return name;
  };
  async function search() {
    console.log("hey");
    const response = await fetch(
      `http://localhost:8000/api/item_routes/items/${searchInput}`
    );
    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      console.log(message);
      return;
    }
    const data = await response.json();
    //Update search result
    setSearchResults(data);
  }

  console.log("navbar authenticated:", authenticated);

  if (authenticated === "true") {
    console.log("LOGGED-IN NAVBAR");
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand text-info font-weight-bolder" href="/lists">
          <span className="">otagoMarketplace</span>
        </a>
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarToggleExternalContent"
        >
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="search otagoMarketplace"
              aria-label="Search"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              disabled={!searchInput}
              size={searchInput.toString()}
              onClick={() => {
                search();
              }}
            >
              Search
            </button>
          </form>
          <a className="nav-link text-info" href="/create">
            {" "}
            Add Listing{" "}
          </a>
          <a className="nav-link text-info" href="/profile">
            {" "}
            Profile{" "}
          </a>
        </div>
        <span className="nav-link text-info">Welcome {getUser()}!</span>
        <button
          className="btn btn-outline-success"
          type="submit"
          onClick={handleLogout}
        >
          {" "}
          Logout{" "}
        </button>
      </nav>
    );
  } else {
    console.log("FULL NAVBAR");
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand text-info font-weight-bolder" href="/lists">
          <span className="">otagoMarketplace</span>
        </a>
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarToggleExternalContent"
        >
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="search otagoMarketplace"
              aria-label="Search"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              disabled={!searchInput}
              size={searchInput.toString()}
              onClick={() => {
                search();
              }}
            >
              Search
            </button>
          </form>
          {/* <a className="nav-link text-info" href="/create"> Add Listing </a> */}
          <a className="nav-link text-info" href="/">
            {" "}
            Login{" "}
          </a>
          <a className="nav-link text-info" href="/register">
            {" "}
            Register{" "}
          </a>
          {/* <a className="nav-link text-info" href="/profile"> Profile </a> */}
        </div>
      </nav>
    );
  }
};

export default Navbar;

//See: https://johnotu.medium.com/how-to-toggle-bootstrap-navbar-collapse-button-in-react-without-jquery-1d5c2fb0751c
