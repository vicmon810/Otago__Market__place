import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ".//../../CSS/itemsList.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InventoryIcon from '@mui/icons-material/Inventory';import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import LocationIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescIcon from '@mui/icons-material/Description';
import NumbersIcon from '@mui/icons-material/Numbers';

import { TypeAnimation } from 'react-type-animation';


const Record = (props) => (
  
    <div className="column">
      <div className="card" style={{ backgroundColor: 'white' }}>
        <Button size="large" href={`/item/${props.record._id}`}>{props.record.title}</Button>
        <br></br>
        <img id="base64image" src={props.record.images64} alt="No image(s)" />
        <br></br>


        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'white' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Category:" secondary={props.record.category} />
              </ListItem>
            </List>
          </nav>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Quantity:" secondary={props.record.quantity} />
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <LocationIcon />
              </ListItemIcon>
              <ListItemText primary="Location:" secondary={props.record.location} />
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <DescIcon />
              </ListItemIcon>
              <ListItemText primary="Description:" secondary={props.record.description} />

            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Listing Date:" secondary={props.record.listingDate} />
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Posted by:" />
              <ListItemText secondary={props.record.userAccount} />
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <NumbersIcon />
              </ListItemIcon>
              <ListItemText primary="Product ID:" secondary={props.record.product_id} />
            </ListItem>
          </List>
        </Box>


      </div>

    </div>
);



export default function RecordList() {
  const [records, setRecords] = useState([]);

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

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:8000/api/item_routes/item/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    if (records.length>0){
    console.log("records", records);
    return records.map((record) => {
      return (
        <Record
          record={record}
          key={record._id}
        />
      );
    });
    }
  }



  return (
    <div>
    <span style={{ fontSize: '2em' }}>
    <span size>View all the  </span>{' '}    
    <TypeAnimation
      sequence={[
        'Keyboard', // Types 'One'
        3000, // Waits 1s
        'Monitor', // Deletes 'One' and types 'Two'
        3000, // Waits 2s
        'Coffee Table', // Types 'Three' without deleting 'Two'
        () => {
          console.log('Sequence completed'); // Place optional callbacks anywhere in the array
        }
      ]}
      
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{  display: 'inline-block' }}
    /> </span>

    <br></br>
    {recordList()}
    </div>
  );
}
