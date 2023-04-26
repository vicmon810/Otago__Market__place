import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    product_id: "", //product ID should be generated automatically (by formula)
    title: "",
    category: "",
    quantity: "",
    location: "",
    description: "",
    images: "",
    listingDate: "",
    userAccount: "",
    contactInfo: {email:"", number:""}
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
    console.log(JSON.stringify(newItem));
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
      product_id: "", //product ID should be generated automatically (by formula)
      title: "",
      category: "",
      quantity: "",
      location: "",
      description: "",
      images: "",
      listingDate: "",
      userAccount: "",
      contactInfo: {email:"", number:""}
    });
    navigate("/");
  }

  function validateImageSize(_, input) {
    const ImageSize = document.getElementById("Image").files[0].size / 1024 / 1024; // in MB
    if (ImageSize > 20) {
      alert('File size exceeds 20 MB');
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
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.ittle}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Category">Category</label>
          <div></div>
          <select id = "category" onChange={(e) => updateForm({ category: e.target.value })} >  
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
            placeholder = "1"
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
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })
            }
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="Image">Image(s)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="images"
            value={form.images}
            onChange={(e) => validateImageSize(e.target.files)}
          />
        </div>
         
        {
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
  );
}