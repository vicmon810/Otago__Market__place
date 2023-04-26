import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    username: "",
    item: "",
    message: "",
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

    const messageContent = { ...form };

    await fetch("http://localhost:8000/api/account_routes/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageContent),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      username: "",
      item: "",
      message: "",
    });
    window.alert("Message sent!");
    navigate("/");
  }
  
  // This following section will display the form that takes the input from the item.
  return (
    <div>
      <h3>Send Message</h3>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="item">Item</label>
          <input
            type="text"
            className="form-control"
            id="item"
            value={form.item}
            onChange={(e) => updateForm({ item: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            className="form-control"
            id="message"
            value={form.message}
            onChange={(e) => updateForm({ message: e.target.value })}
          />
        </div>
         
        {
          <div className="form-group">
            <input
              type="submit"
              value="Send message"
              className="btn btn-primary"
            />
          </div>
        }
      </form>
    </div>
  );
}