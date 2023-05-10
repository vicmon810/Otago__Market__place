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
  useMediaQuery,
} from "@mui/material";
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

      await GetUserByEmail();

      const curruser = localStorage.getItem("currUser");
      const curruser_parsed = JSON.parse(curruser);
      console.log(localStorage);
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
              Welcome to <br /> 
              otagoMarketplace
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
          display: "flex",
          flexDirection: "column",
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

              <Box sx={{ mt: 2 }} />  {/* //linebreak */}

              <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
                Don't have an account?
              </Typography>

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "white",
                  },
                }}
                component="a"
                href="/register"
              >
                Register
              </Button>
            </CardContent>
          </Card>
        </Grid>

    </Container>
  );
}
