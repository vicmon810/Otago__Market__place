import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { Link } from "react-router-dom";
import deleteRecord from "../itemsList/itemsList.js";
import ".//../../CSS/itemsList.css";

//TODO: backend- authorize edit (by user)

export default function Edit() {
  const params = useParams();
  const id = params.id.toString();
  const [form, setForm] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function fetchItem() {
      const response = await fetch(
        `http://localhost:8000/api/item_routes/item/${id}`
      );
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const item = await response.json();
      setForm(item);
    }
    fetchItem();
    return;
  });

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {return { ...prev, ...value };});
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedListing = {
      title: form.title,
      product_id: form.product_id, 
      category: form.category,
      quantity: form.quantity,
      location: form.location,
      description: form.description,
      images: form.images,
      images64: form.images64,
      listingDate: form.listingDate,
      userAccount: form.userAccount,
      contactInfo: { email: form.email, number: form.number },
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:8000/api/item_routes/item/${id}`, {
      method: "PATCH",
      body: JSON.stringify(editedListing),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //navigate("/");
  }
  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Edit Listing</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Title: </label>
          <input type="text" className="form-control"
            id="title"
            //value={form.title}
            defaultValue={form.title}
            onChange={(e) => updateForm({ title: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Category: </label>
          <input type="text" className="form-control"
            id="category"
            value={form.category}
            onChange={(e) => updateForm({ category: e.target.value })} />
        </div>

        <div className="form-group">
          <label htmlFor="name">Quantity: </label>
          <input type="text" className="form-control"
            id="quantity"
            value={form.quantity}
            onChange={(e) => updateForm({ quantity: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Location: </label>
          <input type="text" className="form-control"
            id="location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Description: </label>
          <input type="text" className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })} />
        </div>
        {/* edit images */}
        <div className="form-group">
          <input
            type="submit"
            value="Update Listing"
            className="btn btn-primary"
          />
        </div>
      </form>
      <button className="btn btn-link"
        onClick={() => {
          form.deleteRecord(form._id);
        }}
      >Delete</button>
    </div>
  );
}
