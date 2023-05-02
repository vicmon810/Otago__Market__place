import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

function UseLogout(){
  console.log('UseLogout()');
  localStorage.setItem("authenticated",false);
  localStorage.setItem("currUser",null);
}

export default function GetProfile() {
  const [profile, setProfile] = useState([]);
  const curruser = localStorage.getItem("currUser");
  const curruser_parsed=JSON.parse(curruser);
  const navigate = useNavigate();

  const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated"));

  useEffect(() => {
    async function checkLogin(){
      if (authenticated==="false"){
        navigate('/');
      }}
    checkLogin();
});

  useEffect(() => {
    async function getUser() {
      if (curruser_parsed){
      const response = await fetch(`http://localhost:8000/api/account_routes/account/${curruser_parsed._id}`, {method: "GET"});
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      setProfile(user);
    }}
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

      <form onSubmit={UseLogout}>
      <button type="submit"> Logout </button>
      </form>
    </div>
  );
}