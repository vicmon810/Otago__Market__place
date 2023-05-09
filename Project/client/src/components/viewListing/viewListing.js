import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ".//../../CSS/itemsList.css";

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
  //this will make sure user can only edit/deleted items they created
  if (curruser_parsed.email === lister.email) {
    return (
      <div>
        <h1>Item Listing</h1>
        <div className="title">{listing.title}</div>
        <br></br>
        <img id="base64image" src={listing.images64} alt="No image(s)" />
        <br></br>
        <div>Category: {listing.category}</div>
        <div>Quantity:{listing.quantity}</div>
        <div>Location:{listing.location}</div>
        <div>Description:{listing.description}</div>
        <div>Listed on {listing.listingDate}</div>
        <div>
          by {lister.name} {lister.surname}
        </div>
        <button>Contact Owner</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Item Listing</h1>
        <div className="title">{listing.title}</div>
        <br></br>
        <img id="base64image" src={listing.images64} alt="No image(s)" />
        <br></br>
        <div>Category: {listing.category}</div>
        <div>Quantity:{listing.quantity}</div>
        <div>Location:{listing.location}</div>
        <div>Description:{listing.description}</div>
        <div>Listed on {listing.listingDate}</div>
        <div>
          by {lister.name} {lister.surname}
        </div>
        <div>Contact Information</div>
        <div>Email: {lister.email}</div>
        <div>Phone Number: {lister.number}</div>
        <button>Contact Owner</button>
      </div>
    );
  }
}
