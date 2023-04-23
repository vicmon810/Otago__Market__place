import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <tr>Product ID</tr>
    <tr>{props.record.Product_id}</tr>
    <tr>Product Name</tr>
    <tr>{props.record.Product_name}</tr>
    <tr>Quantity</tr>
    <tr>{props.record.Quantity}</tr>
    <tr>Locations</tr>
    <tr>{props.record.Locations}</tr>
    <tr>Product Description</tr>
    <tr>{props.record.Product_Description}</tr>
    <tr>Product Category</tr>
    <tr>{props.record.product_Category}</tr>
    <tr>Create Date</tr>
    <tr>{props.record.Create_Date}</tr>
    <tr>Owner Account</tr>
    <tr>{props.record.Owner_Account}</tr>
    <tr>Email</tr>
    <tr>{props.record.Owner_Contact?.Email}</tr>
    <tr>Phone Number</tr>
    <tr>{props.record.Owner_Contact?.Phone}</tr>
    <tr>Image</tr>
    <tr>{props.record.Image}</tr>
    <tr>Product Features</tr>
    <tr>{props.record.Product_Features}</tr>
    <tr>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </tr>
  </tr>
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
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
