import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

export default function Create() {
  let itemTitle = "";
  let userTitle = "";

  const [form, setForm] = useState({
    username: "",
    item: "",
    message: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let itemId = query.get("item");
  console.log(itemId);

  // The email works however for prefilling values I can't figure out how to get the following to fill out the
  // form, trying to print them prints nothing. I also am not sure how to get this to only run once, it seems to
  // be continuously running whenever the user modifies any value.
  async function getItemInfo(itemId) {
    const itemData = await fetch(
      "http://localhost:8000/api/item_routes/item/" + itemId
    );
    itemTitle = itemData.body.title;
    const userData = await fetch(
      "http://localhost:8000/api/account_routes/account/" +
        itemData.body.userAccount
    );
    userTitle = userData.body.name;
  }

  getItemInfo(itemId);

  console.log(itemTitle);
  console.log(userTitle);

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
      username: userTitle,
      item: itemTitle,
      message: "",
    });
    window.alert("Message sent!");
    navigate("/lists");
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
