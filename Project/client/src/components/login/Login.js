import React, { useState } from "react";
import { useNavigate } from "react-router";
import ".//../../CSS/Login.css";

export default function LoginForm() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const currUser = useState(
    localStorage.getItem(localStorage.getItem("currUser") || false)
  );
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setLogin((prev) => {
      return { ...prev, ...value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newLogin = { ...login };
    const newLogin_json = JSON.stringify(newLogin);

    console.log("fetching login with details:", newLogin_json);
    const response = await fetch(
      "http://localhost:8000/api/account_routes/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newLogin_json,
      }
    ).catch((error) => {
      window.alert(error);
      return;
    });

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    } else {
      console.log("Logged In! attempting to redirect you! list something!");
      setauthenticated(true);
      localStorage.setItem("authenticated", true);

      async function GetUserByEmail() {
        const response = await fetch(
          `http://localhost:8000/api/account_routes/account/email/${login.email}`,
          { method: "GET" }
        );
        if (!response.ok) {
          const message = `An error occured: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const user = await response.json();
        localStorage.setItem("currUser", JSON.stringify(user));
      }
      GetUserByEmail();
      const curruser = localStorage.getItem("currUser");
      const curruser_parsed = JSON.parse(curruser);
      navigate("/");
      return;
    }
  }

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="login-form-label">
          Email:
        </label>
        <input
          type="text"
          id="email"
          className="login-form-input"
          value={login.email}
          onChange={(e) => updateForm({ email: e.target.value })}
        />

        <label htmlFor="password" className="login-form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="login-form-input"
          value={login.password}
          onChange={(e) => updateForm({ password: e.target.value })}
        />

        <button type="submit" className="login-form-button">
          Login
        </button>
      </form>
      <a href="/register"> Register </a>
    </div>
  );
}
