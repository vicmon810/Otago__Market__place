import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ".//../../CSS/navbar.css";
import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";

const Navbar = ({ setSearchResult }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // const [searchResult, setSearchResult] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
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
    // console.log(localStorage);
    if (user) {
      const name = JSON.parse(user).name; //current login user
      return name;
    }
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:8000/api/item_routes/items/${searchInput}`
    );

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const itemDetail = await response.json();
    setSearchResult(itemDetail); // Update the search result using setSearchResult callback
  };

  if (authenticated === "true") {
    // console.log("LOGGED-IN NAVBAR");
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <head>
          <link href='https://fonts.googleapis.com/css?family=Open Sans' rel='stylesheet'/>
        </head>
        <a className="navbar-brand font-weight-bolder" href="/lists">
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
              className="btn btn-outline-light"
              type="submit"
              disabled={!searchInput}
              size={searchInput.toString()}
              onClick={(event) => {
                handleSearch(event);
              }}
            >
              Search
            </button>
          </form>
          <a className="nav-link " href="/create">
            {" "}
            Add Listing{" "}
          </a>
          <a className="nav-link" href="/account">
            {" "}
            Account{" "}
          </a>
        </div>
        <span className="nav-link ">Welcome {getUser()}!</span>
        <button
          className="btn btn-outline-light"
          type="submit"
          onClick={handleLogout}
        >
          {" "}
          Logout{" "}
        </button>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <head>
          <link href='https://fonts.googleapis.com/css?family=Open Sans' rel='stylesheet'/>
        </head>
        <a className="navbar-brand font-weight-bolder" href="/">
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
              className="btn btn-outline-light"
              type="submit"
              disabled={!searchInput}
              size={searchInput.toString()}
              onClick={() => {
                // handleSearch();
              }}
            >
              Search
            </button>
          </form>
          {/* <a className="nav-link " href="/create"> Add Listing </a> */}
          <a className="nav-link " href="/">
            {" "}
            Login{" "}
          </a>
          <a className="nav-link" href="/register">
            {" "}
            Register{" "}
          </a>
          {/* <a className="nav-link " href="/profile"> Profile </a> */}
        </div>
      </nav>
    );
  }
};

export default Navbar;

//See: https://johnotu.medium.com/how-to-toggle-bootstrap-navbar-collapse-button-in-react-without-jquery-1d5c2fb0751c
