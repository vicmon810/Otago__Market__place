import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    Location: "",
    quantity: "",
    description: "",
    images: "",
    listingDate: "",
    owner: "",
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

    updateForm({ Timestamp: Math.floor(new Date().getTime() / 1000) }); //UTC/Unix timestamp

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newItem = { ...form };
    console.log(newItem);
    await fetch("http://localhost:8000/api/item_routes/items/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      title: "",
      category: "",
      Location: "",
      quantity: "",
      description: "",
      images: "",
      listingDate: "",
      owner: "",
    });
    navigate("/");
  }

  function validateImageSize(_, input) {
    const ImageSize =
      document.getElementById("Image").files[0].size / 1024 / 1024; // in MB
    if (ImageSize > 20) {
      alert("File size exceeds 20 MB");
      // $(file).val(''); //for clearing with Jquery
    } else {
      updateForm({ Image: input }); // soft restriction, must restrict on server-side as well
    }
  }

  // This following section will display the form that takes the input from the item.
  return (
    <div>
      <h3>Add listing</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Category">Category</label>
          <div></div>
          <select
            id="Category"
            onChange={(e) => updateForm({ category: e.target.value })}
          >
            <option> --Choose Category-- </option>
            <option> Appliances </option>
            <option> Clothing </option>
            <option> Electronics </option>
            <option> Furniture </option>
            <option> Stationary </option>
            <option> Other </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={form.quantity}
            placeholder="1"
            onChange={(e) => updateForm({ quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            className="form-control"
            id="Description"
            value={form.Description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Image">Image(s)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="Image"
            value={form.Image}
            onChange={(e) => validateImageSize(e.target.files)}
          />
        </div>

        {
          /* <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">
              Intern
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">
              Junior
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">
              Senior
            </label>
          </div>
        </div> */
          <div className="form-group">
            <input
              type="submit"
              value="Add listing"
              className="btn btn-primary"
            />
          </div>
        }
      </form>
    </div>

    /* product ID should be generated automatically (by formula)
    <div className="form-group">
          <label htmlFor="name">Product Id</label>
          <input
            type="text"
            className="form-control"
            id="Product_id"
            value={form.Product_id}
            onChange={(e) => updateForm({ Product_id: e.target.value })}
          />
    </div>*/

    /* timestamp should be recorded automatically
    <div className="form-group">
      <label htmlFor="Timestamp">Timestamp Date</label>
      <input
        type="text"
        className="form-control"
        id="Timestamp"
        value={form.Timestamp}
        onChange={(e) => updateForm({ Timestamp: e.target.value })}
      />
    </div>
    */

    /* this is the same as Description
    <div className="form-group">
          <label htmlFor="Product_features">Product Features</label>
          <input
            type="text"
            className="form-control"
            id="Product_Features"
            value={form.Product_Features}
            onChange={(e) => updateForm({ Product_Features: e.target.value })}
          />
    </div>
    */
  );
}
