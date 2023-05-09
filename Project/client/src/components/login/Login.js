import React, { useState } from "react";
import { useNavigate } from "react-router";
import ".//../../CSS/Login.css";
import { Link } from "react-router-dom";
import {
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
import { TypeAnimation } from "react-type-animation";
import loginBackground from "../../assets/loginbg.jpg";
import American from "../../assets/American Captain.ttf";

export default function LoginForm() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const currUser = useState(
    localStorage.getItem(localStorage.getItem("currUser") || false)
  );
  const navigate = useNavigate();
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

  // These methods will update the state properties.
  function updateForm(value) {
    return setLogin((prev) => {
      return { ...prev, ...value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newLogin = { ...login };
    const newLogin_json = JSON.stringify(newLogin);

    console.log("fetching login with details:", newLogin_json);
    const response = await fetch(
      "http://localhost:8000/api/account_routes/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newLogin_json,
      }
    ).catch((error) => {
      window.alert(error);
      return;
    });

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    } else {
      console.log("Logged In! attempting to redirect you! list something!");
      setauthenticated(true);
      localStorage.setItem("authenticated", true);

      async function GetUserByEmail() {
        const response = await fetch(
          `http://localhost:8000/api/account_routes/account/email/${login.email}`,
          { method: "GET" }
        );
        if (!response.ok) {
          const message = `An error occured: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const user = await response.json();
        localStorage.setItem("currUser", JSON.stringify(user));
      }
      GetUserByEmail();
      const curruser = localStorage.getItem("currUser");
      const curruser_parsed = JSON.parse(curruser);

      navigate("/lists");
      window.location.reload();
      return;
    }
  }

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
                <span size>Welcome to OtagoMarketplace </span>
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
                  label="Email"
                  variant="standard"
                  id="email"
                  value={login.email}
                  onChange={(e) => updateForm({ email: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <TextField
                  label="Password"
                  variant="standard"
                  type="password"
                  id="password"
                  value={login.password}
                  onChange={(e) => updateForm({ password: e.target.value })}
                  fullWidth
                  sx={{ mt: 4 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 4 }}
                >
                  Login
                </Button>
              </form>

              <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
                Don't have an account?
              </Typography>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 4, color: "white" }}
              >
                <Link
                  to="/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
