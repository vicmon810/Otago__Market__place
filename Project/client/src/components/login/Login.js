import React, { useState } from "react";

import "/Users/apple/Info310/OtagoMarketplace/Project/client/src/components/Login.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add code to submit login information to backend API here
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <form action="Project/client/src/components/create.js"></form>
        <label htmlFor="email" className="login-form-label">
          Email:
        </label>
        <input
          type="text"
          id="email"
          className="login-form-input"
          value={email}
          onChange={handleEmailChange}
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
