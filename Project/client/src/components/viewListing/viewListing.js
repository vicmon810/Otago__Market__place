import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ".//../../CSS/itemsList.css";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CategoryIcon from "@mui/icons-material/Category";
import LocationIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescIcon from "@mui/icons-material/Description";
import NumbersIcon from "@mui/icons-material/Numbers";

const Record = (props) => (
  <div style={{ backgroundColor: "white" }}>
    <Button size="large" href={`/item/${props.record[0]._id}`}>
      {props.record[0].title}
    </Button>
    <br></br>

    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box>
          <img
            id="base64image"
            width="500"
            src={props.record[0].images64}
            alt="No image(s)"
          />
        </Box>
      </Grid>

      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "white" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText
                primary="Category:"
                secondary={props.record[0].category}
              />
            </ListItem>
          </List>
        </nav>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText
              primary="Quantity:"
              secondary={props.record[0].quantity}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <LocationIcon />
            </ListItemIcon>
            <ListItemText
              primary="Location:"
              secondary={props.record[0].location}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <DescIcon />
            </ListItemIcon>
            <ListItemText
              primary="Description:"
              secondary={props.record[0].description}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText
              primary="Listing Date:"
              secondary={props.record[0].listingDate}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary="Posted by:"
              secondary={props.record[1].name + " " + props.record[1].surname}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email:" secondary={props.record[1].email} />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Phone Number:"
              secondary={props.record[1].number}
            />
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <NumbersIcon />
            </ListItemIcon>
            <ListItemText
              primary="Product ID:"
              secondary={props.record[0]._id}
            />
          </ListItem>
        </List>
      </Box>
    </Grid>
  </div>
);

export default function ViewListing() {
  const [listing, setListing] = useState([]);
  const [lister, setLister] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id.toString();
  const curruser = localStorage.getItem("currUser");
  const curruser_parsed = JSON.parse(curruser);

  async function deleteListing() {
    await fetch(`http://localhost:8000/api/item_routes/item/${id}`, {
      method: "DELETE",
    }).catch((error) => {
      window.alert(error);
      return;
    });
    navigate("/");
  }

  // This method fetches the records from the database.
  useEffect(() => {
    async function fetchItem() {
      const response = await fetch(
        `http://localhost:8000/api/item_routes/item/${id}`
      );
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const item = await response.json();
      setListing(item);
    }
    fetchItem();
    // Fetch lister
    async function fetchLister() {
      if (listing.userAccount) {
        const response = await fetch(
          `http://localhost:8000/api/account_routes/account/${listing.userAccount}`,
          { method: "GET" }
        );
        const listingLister = await response.json();
        setLister(listingLister);
      }
    }
    fetchLister();
    return;
  });
  if (curruser_parsed.email === lister.email) {
    // TODO: allow user to edit/delete listing if it belongs to them
    return (
      <div>
        <Record record={[listing, lister]} key={listing._id} />
        {/* TODO: FIX EDIT AND LINK HERE */}
        {/* <Link className="btn btn-link" to={`/edit/${listing._id}`}>Edit</Link> */}
        <button
          class="btn btn-secondary ml-auto"
          onClick={() => {
            deleteListing(listing._id);
          }}
        >
          Delete
        </button>
      </div>
    );
  } else {
    return <Record record={[listing, lister]} key={listing._id} />;
  }
}
