import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [form, setForm] = useState({
    User_Name: "",
    password: "",
    Email: "",
    Contact_Number: "",
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

    setForm({ User_Name: "", password: "", Email: "", Contact_Number: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the item.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
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

        <div className="form-group">
          <label htmlFor="Product_name">password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={form.passwordField}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Create_Date">Email</label>
          <input
            type="text"
            className="form-control"
            id="Email"
            value={form.Email}
            onChange={(e) => updateForm({ Email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Image">Contact Number</label>
          <input
            type="number"
            className="form-control"
            id="Contact_Number"
            value={form.Contact_Number}
            onChange={(e) => updateForm({ Contact_Number: e.target.value })}
          />
        </div>
        {
          <div className="form-group">
            <input
              type="submit"
              value="Create Item"
              className="btn btn-primary"
            />
          </div>
        }
      </form>
    </div>
  );
}
