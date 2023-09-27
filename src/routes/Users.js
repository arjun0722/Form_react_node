import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import './user.css';

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/users");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <>
    <h1>User Data</h1>
    <div className="UserData">
    {data.map((user) => (
      <Card key={user._id} className="user-card">
        <CardContent>
          <Typography variant="h6" className="user-name">
            {user.name}
          </Typography>
          <div className="user-info">
            <div>
            <Typography>Age: {user.age}</Typography>
            <Typography>City: {user.city}</Typography>
            </div>
            <div>
            <Typography>State: {user.state}</Typography>
            <Typography>Country: {user.country}</Typography>
            </div>
            <Typography>Date of Birth: {user.dob}</Typography>
            <Typography>Email: {user.email}</Typography>
            <div>
            <Typography>Gender: {user.gender}</Typography>
            <Typography>Last Name: {user.lastname}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
    </>
  );
};

export default Users;
