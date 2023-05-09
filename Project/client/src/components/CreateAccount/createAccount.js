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
} from "@mui/material";

export default function Register() {
  const theme = createTheme();

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
    number: "",
    department: "",
    activationDate: "",
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

  // This function will handle the submission.
  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: add authentication
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
        number: "",
        department: "",
        activationDate: "",
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
      <Grid container>
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
              <span
                style={{ fontFamily: "American Captain", fontSize: "55px" }}
              >
                <span> Register for an Account </span>
              </span>
            </Grid>
          </Box>
        </ThemeProvider>

        <Grid item md={6} sx={{ position: "relative" }}>
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
                  label="First Name"
                  variant="standard"
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  label="Last Name"
                  variant="standard"
                  id="surname"
                  value={form.surname}
                  onChange={(e) => updateForm({ surname: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  label="Faculty Email (.ac.nz)"
                  variant="standard"
                  id="email"
                  value={form.email}
                  // TODO: add restrictions (faculty email)
                  onChange={(e) => updateForm({ email: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  label="Password"
                  variant="standard"
                  id="password"
                  value={form.password}
                  // TODO: add restrictions
                  onChange={(e) => updateForm({ password: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  label="Phone Number"
                  variant="standard"
                  id="number"
                  value={form.number}
                  // TODO: add restrictions (valid/NZ phone number)
                  onChange={(e) => updateForm({ number: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <Autocomplete
                  disablePortal
                  id="department"
                  options={options}
                  getOptionLabel={(option) => option.label} // Specify how to extract the label from the option
                  sx={{ width: 400 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Department" id="department" />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) =>
                    updateForm({ department: value ? value.label : "" })
                  }
                />

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
      </Grid>
    </Container>
  );
}
