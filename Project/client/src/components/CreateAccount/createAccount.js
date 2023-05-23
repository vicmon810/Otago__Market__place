import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../login/Login";
import loginBackground from "../../assets/loginbg.jpg";
import American from "../../assets/American Captain.ttf";
import {
  Autocomplete,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";

export default function Register() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const styles = {
    "@font-face": [
      {
        fontFamily: "American Captain",
        src: `url(${American}) format('truetype')`,
        fontWeight: "normal",
        fontStyle: "normal",
      },
    ],
  };

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirm_password: "",
    number: "",
    department: "",
    activationDate: "",
    images64: "",
  });

  const options = [
    { label: "Division of Commerce/School of Business", id: 1 },
    { label: "Division of Health Sciences", id: 2 },
    { label: "Division of Humanities", id: 3 },
    { label: "Division of Sciences", id: 4 },
    { label: "Academic Division", id: 5 },
    { label: "Accomodation Services Division", id: 6 },
    { label: "Financial Services Division", id: 7 },
    { label: "Human Resources Division", id: 8 },
    { label: "Student Services Division", id: 9 },
    { label: "Information Technology Services Division", id: 10 },
    { label: "External Engagement Division", id: 11 },
    { label: "Property Services Division", id: 12 },
    { label: "Research & Enterprise Division", id: 13 },
    { label: "Others", id: 14 },
  ];

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
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

  // This function will handle the submission.
  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password != form.confirm_password) {
      window.alert('Passwords do not match.');
      updateForm({ password: '', confirm_password: '' });
      return;
    }
    // check that email doesn't already have an account associated
    async function checkEmail() {
      const response = await fetch(
        `http://localhost:8000/api/account_routes/account/email/${form.email}`,
        { method: "GET" }
      );
      const existing = await response.json();
      if (existing) {
        window.alert(`An error occured: ${form.email} already in use`);
        updateForm({ email: '' });
        return 0;
      }
      else {
        updateForm({ email: form.email });
      } 

    }
    const validEmail = await checkEmail();
    if (validEmail === 0) {return;}
    
    // When a post request is sent to the create URL, we'll add a new record to the database.
    const newItem = { ...form };
    const newItem_json = JSON.stringify(newItem);
    console.log(newItem);
    try {
      await fetch("http://localhost:8000/api/account_routes/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newItem_json,
      });
      setForm({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirm_password: "",
        number: "",
        department: "",
        activationDate: "",
        images64: "",
      });
      window.alert("Registration Successful! Please Log In now.");

      navigate("/login");
    } catch (error) {
      window.alert(error);
      console.log("returning here");
      return;
    }
  }

  // This following section will display the form that takes the input from the item.
  return (
    <Container
      maxWidth="xl"
      sx={{
        p: 4,
        bgcolor: "background.radialGradient",
        overflow: "hidden",
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={styles}>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h2"}
              sx={{ fontFamily: "American Captain", textAlign: "center" }}
            >
              Register <br /> 
              for an Account
            </Typography>
          </Grid>
        </Box>
      </ThemeProvider>

      <Grid
        item
        md={6}
        sx={{
          position: "relative",
          right: 0,
          top: 0,
          bottom: 0,
          //flexDirection: "column",
          justifyContent: "center",
          p: 5,
        }}
        >            
          <div
            id="radius-shape-1"
            sx={{ position: "absolute", borderRadius: "50%", boxShadow: 5 }}
          ></div>
          <div
            id="radius-shape-2"
            sx={{ position: "absolute", boxShadow: 5 }}
          ></div>
          <Card sx={{ my: 5, bgcolor: "background.glass" }}>
            <CardContent sx={{ p: 5 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  label="First Name"
                  variant="standard"
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  required
                  label="Last Name"
                  variant="standard"
                  id="surname"
                  value={form.surname}
                  onChange={(e) => updateForm({ surname: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  required
                  label="Faculty Email (.ac.nz)"
                  variant="standard"
                  id="email"
                  type="email"
                  value={form.email}
                  // TODO: add restrictions (faculty email)
                  onChange={(e) => updateForm({ email: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  required
                  label="Password"
                  variant="standard"
                  id="password"
                  type="password"
                  value={form.password}
                  // TODO: add restrictions
                  onChange={(e) => updateForm({ password: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  required
                  label="Confirm Password"
                  variant="standard"
                  id="confirm_password"
                  type="password"
                  value={form.confirm_password}
                  // TODO: add restrictions
                  onChange={(e) => updateForm({ confirm_password: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  required
                  label="Phone Number"
                  variant="standard"
                  id="number"
                  value={form.number}
                  // TODO: add restrictions (valid/NZ phone number)
                  onChange={(e) => updateForm({ number: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />
              
                <Box sx={{ mt: 2 }} />  {/* //linebreak */}
                <Autocomplete
                  
                  disablePortal
                  id="department"
                  options={options}
                  getOptionLabel={(option) => option.label} // Specify how to extract the label from the option
                  sx={{ width: 620 }}
                  renderInput={(params) => (
                    <TextField required {...params} label="Department" id="department" />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) =>
                    updateForm({ department: value ? value.label : "" })
                  }
                />
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
                  sx={{ mt: 4 }}
                >
                  Register!
                </Button>
              </form>

              <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
                Disclaimer: OtagoMarketplace is a platform for members (faculty
                and staff) of the University of Otago.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
    </Container>
  );
}
