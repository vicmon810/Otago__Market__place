import React, { useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Button,} from "@mui/material";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    quantity: "",
    location: "",
    description: "",
    images64: "",
    listingDate: "",
    userAccount: "",
    contactInfo: { email: "", number: "" },
  });

  const options = [
    { label: "Clothing", id: 1 },
    { label: "Electronics", id: 2 },
    { label: "Furniture", id: 3 },
    { label: "Stationary", id: 4 },
    { label: "Other", id: 5 },
  ];

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      //return { ...prev, ...value, category: value.label };
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // Get logged-in user details
    const curruser = localStorage.getItem("currUser");
    const curruser_parsed = JSON.parse(curruser);
    console.log(curruser);
    form.userAccount = curruser_parsed._id;

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newItem = { ...form };
    console.log("pushing newItem", JSON.stringify(newItem));
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
      quantity: "",
      location: "",
      description: "",
      images64: "",
      listingDate: "",
      userAccount: "",
      contactInfo: { email: "", number: "" },
    });
    navigate("/lists");
  }

  function validateImageSize(eventTarget) {
    //let clickSubmit = document.getElementById('submit');
    let fileInput = document.getElementById("images").files;
    console.log("fileInput", fileInput);
    if (fileInput.length > 0) {
      const imageSize = fileInput[0].size / 1024 / 1024; // in MB
      console.log("ImageSize", imageSize);
      if (imageSize > 16) {
        alert("File size exceeds 16 MB"); // 16MB for storage with MongoDB
        // $(file).val(''); //for clearing with Jquery
      } else {
        const [imageFile] = fileInput;
        const fileReader = new FileReader();

        fileReader.onloadend = function () {
          console.log("RESULT", fileReader.result);
          var res = fileReader.result;
          console.log("res0", res);
          updateForm({ images64: fileReader.result });
        };
        fileReader.readAsDataURL(imageFile);
      }
    }
  }

  // This following section will display the form that takes the input from the item.
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        alignItems="center"
        sx={{
          width: 400,
          height: 500,
          backgroundColor: "white",
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <h3>Add listing</h3>

        <TextField
          label="Title"
          id="title"
          value={form.title}
          onChange={(e) => updateForm({ title: e.target.value })}
          variant="standard"
          fullWidth
        />
        
        <Box sx={{ mt: 2 }} />  {/* //linebreak */}

        <Autocomplete
          disablePortal
          id="category"
          options={options}
          getOptionLabel={(option) => option.label} // Specify how to extract the label from the option
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField {...params} label="Category" id="category" />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) =>
            updateForm({ category: value ? value.label : "" })
          }
        />

        <TextField
          label="Quantity"
          id="quantity"
          value={form.quantity}
          placeholder="1"
          onChange={(e) => updateForm({ quantity: e.target.value })}
          variant="standard"
          fullWidth
        />

        <div>
          <TextField
            label="Location"
            id="location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
            variant="standard"
            fullWidth
          />
        </div>

        <div>
          <TextField
            label="Description"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            variant="standard"
            fullWidth
          />
        </div>
        <Box sx={{ mt: 2 }} />  {/* //linebreak */}

        <div className="form-group">
          <label htmlFor="Image">Image(s)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="images"
            //value={form.images}
            onChange={(e) => validateImageSize(e.target.files)}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="primary"
          sx={{ mt: 2 }}
        >
          Add listing
        </Button>

      </Box>
    </div>
  );
}
