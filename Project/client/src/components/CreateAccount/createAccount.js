import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    number: "",
    department: "",
    activationDate: ""
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
    const newItem_json = JSON.stringify(newItem);
    console.log(newItem);
    await fetch("http://localhost:8000/api/account_routes/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newItem_json,
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({name: "", surname: "", email: "", password: "", number: "", department: "", activationDate: ""});
    navigate("/");
  }

  // This following section will display the form that takes the input from the item.
  return (
    <div>
      <h3>Register for OtagoMarketplace</h3>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label htmlFor="Name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Surname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="surname"
            value={form.surname}
            onChange={(e) => updateForm({ surname: e.target.value })}
          />
        </div>
      <div className="form-group">
          <label htmlFor="Email">Faculty Email (.ac.nz)</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            // TODO: add restrictions (faculty email)
            onChange={(e) => updateForm({ email: e.target.value })}
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
            value={form.number}
            // TODO: add restrictions (valid/NZ phone number)
            onChange={(e) => updateForm({ number: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Department">Department</label>
          <div></div>
          <select id = "department" onChange={(e) => updateForm({ department: e.target.value })} >  
            <option> --Choose Department-- </option>  
            <optgroup label="Academic Divisions">
              <option> Division of Commerce/School of Business</option>  
              <option> Division of Health Sciences </option>  
              <option> Division of Humanities </option>  
              <option> Division of Sciences </option>  
            </optgroup>
            <optgroup label="Service Divisions">
              <option> Academic Division </option>  
              <option> Accomodation Services Division </option>  
              <option> Financial Services Division </option>  
              <option> Human Resources Division </option>  
              <option> Information Technology Services Division </option> 
              <option> External Engagement Division </option> 
              <option> Property Services Division </option> 
              <option> Research & Enterprise Division </option> 
              <option> Student Services Division </option> 
            </optgroup>
            <option> Other </option>  
          </select> 
        </div>
          <div className="form-group">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary"
            />
          </div>
      </form>
      <br></br>
      <body> Disclaimer: OtagoMarketplace is a platform for members (faculty and staff) of the University of Otago. </body> 
    </div>
    
  );
}