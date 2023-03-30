import React, { useState } from "react";

import "./App.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Add code to submit login information to backend API here
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="login-form-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="login-form-input"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="password" className="login-form-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="login-form-input"
          value={password}
          onChange={handlePasswordChange}
        />

        {error && <p className="login-form-error">{error}</p>}

        <button type="submit" className="login-form-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
