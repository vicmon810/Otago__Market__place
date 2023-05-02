import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ".//../../CSS/itemsList.css";

const Record = (props) => (
  <div className="column">
    <div className="card">
      <Link className="btn btn-link" to={`/item/${props.record._id}`}>
        {props.record.title}
      </Link>
      <br></br>
      <img id="base64image" src={props.record.images64} alt="No image(s)" />
      <br></br>
      <div>Category: {props.record.category}</div>
      <div>Quantity:{props.record.quantity}</div>
      <div>Location:{props.record.location}</div>
      <div>Description:{props.record.description}</div>
      <div>Listed on {props.record.listingDate}</div>
      <div>by {props.record.userAccount}</div>
      <div>ID: {props.record.product_id}</div>
    </div>
  </div>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
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
      if (curruser_parsed === records.userAccount) {
        console.log("Test");
      }
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
    if (records.length > 0) {
      return records.map((record) => {
        return <Record record={record} key={record._id} />;
      });
    }
  }

  return (
    <div>
      <h3>All Listings</h3>
      {recordList()}
    </div>
  );
}
