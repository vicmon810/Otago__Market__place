import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          {" "}
          Home
        </NavLink>
        <NavLink className="nav-link" to="/create">
          {/* Testing purpose will delete it later */}
          Create item
        </NavLink>
        <NavLink className="nav-link" to="/login">
          {/* Testing purpose will delete it later */}
          Log in
        </NavLink>
        <NavLink className="nav-link" to="/register">
          {/* Testing purpose will delete it later */}
          Sign in
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <NavLink className="nav-link" to="/create">
              Create item
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Log in
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Sign in
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
}