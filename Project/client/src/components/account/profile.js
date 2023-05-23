import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LocationIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescIcon from "@mui/icons-material/Description";
import NumbersIcon from "@mui/icons-material/Numbers";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import MyNavbar from "./myNavbar";
import { createTheme,ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif'
    ].join(','),
  }
});

function UseLogout() {
  console.log("UseLogout()");
  localStorage.setItem("authenticated", false);
  localStorage.setItem("currUser", null);
}

const Profile = (props) => (
  <div>
          <MyNavbar />
          <ThemeProvider theme={theme}>

  <div className="column">
    <div style={{ backgroundColor: "white" }}>
      <Box sx={{ width: "100%", bgcolor: "white" }}>
      {/* {console.log("Image URL or base64 data:", props.images64)} */}

        <img
          id="base64image"
          style={{ maxHeight: "500px", maxWidth: "500px" }}
          src={props.images64}
          alt="No image(s)"
        />

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Name:"
              secondary={props.record.name + " " + props.record.surname}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText
              primary="Department:"
              secondary={props.record.department}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email:" secondary={props.record.email} />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Phone Number:"
              secondary={props.record.number}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText
              primary="Account activated on:"
              secondary={props.record.activationDate}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <NumbersIcon />
            </ListItemIcon>
            <ListItemText primary="User ID:" secondary={props.record._id} />
          </ListItem>
        </List>
      </Box>
    </div>
  </div>
  </ThemeProvider>

  </div>

);

export default function GetProfile() {
  const [profile, setProfile] = useState([]);
  const curruser = localStorage.getItem("currUser");
  const curruser_parsed = JSON.parse(curruser);
  const navigate = useNavigate();

  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("authenticated")
  );

  useEffect(() => {
    async function checkLogin() {
      if (authenticated === "false") {
        navigate("/");
      }
    }
    checkLogin();
  });

  useEffect(() => {
    async function getUser() {
      if (curruser_parsed) {
        const response = await fetch(
          `http://localhost:8000/api/account_routes/account/${curruser_parsed._id}`,
          { method: "GET" }
        );
        if (!response.ok) {
          const message = `An error occured: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const user = await response.json();
        setProfile(user);
      }
    }
    getUser();
    return;
  });

  return (
    <Profile record={profile} key={profile._id} />
    // <div>
    //   <h1>Profile</h1>
    //   <p>
    //     Name: {profile.name} {profile.surname}
    //   </p>
    //   <p>Email: {profile.email}</p>
    //   <p>Phone Number: {profile.number}</p>
    //   <p>Department: {profile.department}</p>
    //   <p>Account activated on: {profile.activationDate}</p>
    // </div>
  );
}
