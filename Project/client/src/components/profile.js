import React, { useState, useEffect } from 'react';

export default function GetProfile() {
  const [profile, setProfile] = useState([]);
  const curruser = localStorage.getItem("currUser");
  const curruser_parsed=JSON.parse(curruser);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`http://localhost:8000/api/account_routes/account/${curruser_parsed._id}`, {method: "GET"});
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      setProfile(user);
    }
    getUser();
    return;
  });
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name} {profile.surname}</p>
      <p>Email: {profile.email}</p>
      <p>Phone Number: {profile.number}</p>
      <p>Department: {profile.department}</p>
      <p>Account activated on: {profile.activationDate}</p>
    </div>
  );
}