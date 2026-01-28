require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {port} = require('./config/env.js')
const connectDB = require('./config/db.js');
connectDB()
// middlewares
express(express.json());
app.use(express.urlencoded({ extended: false }));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobType: {
      type: String,
    },
  },
  { timeStamp: true },
);

const User = mongoose.model("users", userSchema);

// GET all users in html
app.get("/users", (req, res) => {
  const html = `
        <h1>Users</h1>
        <div">${usersData
          .map(
            (user) => `
            <ul>
                <li>S.NO :${user.id} </li>
                <li>First Name :${user.first_name} </li>
                <li>Last Name :${user.last_name}</li>
                <li>Email :${user.email}</li>
                <li>Gender :${user.gender}</li>
                <li>Job Type :${user.job_type}</li>
            </ul>
            `,
          )
          .join("")}
        </div>`;
  res.send(html);
});

// GEt user by id
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = usersData.find((user) => user.id === id);
  if (user) {
    res.send(`<ul>
                <li>S.NO :${user.id} </li>
                <li>First Name :${user.first_name} </li>
                <li>Last Name :${user.last_name}</li>
                <li>Email :${user.email}</li>
                <li>Gender :${user.gender}</li>
                <li>Job Type :${user.job_type}</li>
            </ul>`);
  } else {
    res.send("No such user found ");
  }
});

// GET all user in json fromate
app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    message: "you have successfull get users data",
    data: usersData,
  });
  req.end();
});

app.post("/api/users/", (req, res) => {
  User.create({
    firstName
  })

 
});


app.listen(port || 5000, () => {
  console.log(`server is running on port ${port}`);
});
