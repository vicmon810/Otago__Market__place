import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    number: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // TODO: add authentication
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newItem = { ...form };

    await fetch("http://localhost:8000/api/account_routes/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ Email: "", Password: "", Number: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the item.
  return (
    <div>
      <h3>Register for OtagoMarketplace</h3>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label htmlFor="Email">Faculty Email (.ac.nz)</label>
          <input
            type="text"
            className="form-control"
            id="Email"
            value={form.email}
            onChange={(e) => updateForm({ Email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={form.password}
            // TODO: add restrictions
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Number">Phone Number</label>
          <input
            type="number"
            className="form-control"
            id="number"
            value={form.Contact_Number}
            // TODO: add restrictions (valid/NZ phone number)
            onChange={(e) => updateForm({ Contact_Number: e.target.value })}
          />
        </div>
        {
          <div className="form-group">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary"
            />
          </div>
        }
      </form>
    </div>
    
    /* Use faculty email for login
    <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            className="form-control"
            id="User_Name"
            value={form.User_Name}
            onChange={(e) => updateForm({ User_Name: e.target.value })}
          />
        </div>
    */
  );
}
