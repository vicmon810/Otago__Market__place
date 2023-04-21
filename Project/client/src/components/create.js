import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    Product_id: "",
    Product_name: "",
    Quantity: "",
    Locations: "",
    Product_description: "",
    Product_category: "",
    Create_time: "",
    Owner_account: "",
    Image: "",
    Product_Features: "",
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
      Product_id: "",
      Product_name: "",
      Quantity: "",
      Locations: "",
      Product_description: "",
      Product_category: "",
      Create_time: "",
      Owner_account: "",
      Image: "",
      Product_Features: "",
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Id</label>
          <input
            type="text"
            className="form-control"
            id="Product_id"
            value={form.Product_id}
            onChange={(e) => updateForm({ Product_id: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Product_name">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="Product_name"
            value={form.Product_name}
            onChange={(e) => updateForm({ Product_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="Quantity"
            value={form.Quantity}
            onChange={(e) => updateForm({ Quantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Locations">Locations</label>
          <input
            type="text"
            className="form-control"
            id="Locations"
            value={form.Locations}
            onChange={(e) => updateForm({ Locations: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Product_Description">Product_Description</label>
          <input
            type="text"
            className="form-control"
            id="Product_Description"
            value={form.Product_description}
            onChange={(e) =>
              updateForm({ Product_description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="Create_Date">Create Date</label>
          <input
            type="text"
            className="form-control"
            id="Create_Date"
            value={form.Create_time}
            onChange={(e) => updateForm({ Create_time: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Image">Image</label>
          <input
            type="file"
            className="form-control"
            id="position"
            value={form.Image}
            onChange={(e) => updateForm({ Image: e.target.value })}
          />
        </div>
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
              value="Create Item"
              className="btn btn-primary"
            />
          </div>
        }
      </form>
    </div>
  );
}
