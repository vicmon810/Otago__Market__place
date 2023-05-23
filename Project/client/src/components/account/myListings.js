import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ".//../../CSS/itemsList.css";
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
import CategoryIcon from "@mui/icons-material/Category";
import LocationIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescIcon from "@mui/icons-material/Description";
import NumbersIcon from "@mui/icons-material/Numbers";
import navbar from "../../components/navbar/navbar";
import generalBackground from "../../assets/GeneralBg.jpg";
import {Container,} from "@mui/material";
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
const Record = (props) => (
  <div className="column">
    <div className="card" style={{ backgroundColor: "white" }}>
      <Button size="large" href={`/item/${props.record._id}`}>
        {props.record.title}
      </Button>
      <br></br>
      <img id="base64image" src={props.record.images64} alt="No image(s)" />
      <br></br>

      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "white" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText
                primary="Category:"
                secondary={props.record.category}
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
              secondary={props.record.quantity}
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
              secondary={props.record.location}
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
              secondary={props.record.description}
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
              secondary={props.record.listingDate}
            />
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <NumbersIcon />
            </ListItemIcon>
            <ListItemText primary="Product ID:" secondary={props.record._id} />
          </ListItem>
        </List>
      </Box>
      <a href={"message?item=" + props.record._id}><button>Contact Owner</button></a>
    </div>
  </div>
);

export default function MyRecordList() {
  const [records, setRecords] = useState([]);
  const [myRecords, setMyRecords] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const curruser = localStorage.getItem("currUser");
  const curruser_parsed = JSON.parse(curruser);
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `http://localhost:8000/api/item_routes/items`
      );
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  // This method will map out the records on the table
  function RecordList() {
    // filter records
    var mine = records.filter(p => p.userAccount == curruser_parsed._id);
    useEffect(() => setMyRecords(mine));
    if (myRecords.length>0) {
        return myRecords.map((record) => {
          return <Record record={record} key={record._id} />;
        });
      }
   
  }
  function searchResult() {
    console.log(searchResults);
    console.log("HAHA");
  }

  if (searchResult.length > 0) {
    return (
    <ThemeProvider theme={theme}>
      <Container
      maxWidth="xl"
      sx={{
        p: 4,
        bgcolor: "background.radialGradient",
        overflow: "hidden",
        backgroundImage: `url(${generalBackground})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <br></br>
        {searchResult()}
      </div>
      </Container>
      </ThemeProvider>
    );
  } else {
    return (
        <div>
        <MyNavbar />
        <ThemeProvider theme={theme}>
      <Container
      maxWidth="xl"
      sx={{
        p: 4,
        bgcolor: "background.radialGradient",
        overflow: "hidden",
        backgroundImage: `url(${generalBackground})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div>
        <br></br>
        {RecordList()}
      </div>
      </Container>
        </ThemeProvider>
      </div>
    );
  }
}
