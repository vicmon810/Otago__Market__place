import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { Link } from "react-router-dom";
import deleteRecord from "../itemsList/itemsList.js";
import ".//../../CSS/itemsList.css";

//TODO: backend- authorize edit (by user)
export default function Edit() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id.toString();
  const [form, setForm] = useState({
    title: "",
    product_id: "",
    category: "",
    quantity: "",
    location: "",
    description: "",
    images: [],
    images64: [],
    listingDate: "",
    userAccount: "",
    contactInfo: { email: "", number: "" },
  });

  async function deleteListing() {
    await fetch(`http://localhost:8000/api/item_routes/item/${id}`, {
      method: "DELETE",
    }).catch((error) => {
      window.alert(error);
      return;
    });
    navigate("/lists");
  }

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
  }, [id]);

  // These methods will update the state properties.
  function updateForm(key, value) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [key]: value,
      };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const updatedForm = {
      title: e.target.title.value,
      // product_id: e.target.product_id.value,
      category: e.target.category.value,
      quantity: e.target.quantity.value,
      location: e.target.location.value,
      description: e.target.description.value,
      // images: e.target.images.value,
      // images64: e.target.images64.value,
      // listingDate: e.target.listingDate.value,
      // userAccount: e.target.userAccount.value,
      // contactInfo: {
      //   email: e.target.email.value,
      //   number: e.target.number.value,
      // },
    };
    const editedListing = {
      ...form,
      ...updatedForm,
    };
    // update the form state
    updateForm(editedListing);

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:8000/api/item_routes/item/${id}`, {
      method: "PATCH",
      body: JSON.stringify(editedListing),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(editedListing);
    navigate("/lists");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Edit Listing</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Title: </label>
          <input
            type="text"
            className="form-control"
            name="title"
            //value={form.title}
            defaultValue={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Category: </label>
          <input
            type="text"
            className="form-control"
            name="category"
            defaultValue={form.category}
            onChange={(e) => updateForm({ category: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Quantity: </label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            defaultValue={form.quantity}
            onChange={(e) => updateForm({ quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Location: </label>
          <input
            type="text"
            className="form-control"
            name="location"
            defaultValue={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Description: </label>
          <input
            type="text"
            className="form-control"
            name="description"
            defaultValue={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
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
      <button
        class="btn btn-secondary ml-auto"
        onClick={() => {
          deleteListing(id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
