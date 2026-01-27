const express = require("express");
const app = express();
require("dotenv").config();
const usersData = require("./MOCK_DATA.json");
const fs = require('fs');
// middlewares 
express(express.json());
app.use(express.urlencoded({extended:false}))

// GET all users in html 
app.get("/users", (req, res) => {
    const html = `
        <h1>Users</h1>
        <div">${usersData.map((user) => `
            <ul>
                <li>S.NO :${user.id} </li>
                <li>First Name :${user.first_name} </li>
                <li>Last Name :${user.last_name}</li>
                <li>Email :${user.email}</li>
                <li>Gender :${user.gender}</li>
                <li>Job Type :${user.job_type}</li>
            </ul>
            `).join("")}
        </div>`;
    res.send(html);
});

// GEt user by id 
app.get("/users/:id",(req , res) => {
    const id = Number(req.params.id);
    const user = usersData.find((user)=> user.id === id);
    if(user){
        res.send(`<ul>
                <li>S.NO :${user.id} </li>
                <li>First Name :${user.first_name} </li>
                <li>Last Name :${user.last_name}</li>
                <li>Email :${user.email}</li>
                <li>Gender :${user.gender}</li>
                <li>Job Type :${user.job_type}</li>
            </ul>`)
    }else{
        res.send("No such user found ")
    }
});

// GET all user in json fromate
app.get("/api/users", (req, res) => {
  res
    .status(200)
    .json({
      success: true,
      message: "you have successfull get users data",
      data: usersData,
    });
  req.end();
});

app.post("/api/users/", (req , res) => {
    const body = req.body
    const id = usersData.length + 1 
    usersData.push({id , ...body})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(usersData) , (err, data) => {
        if(!err){
            return res.status(201).json({status:"success" , id:id})
        }else{
            return res.status(500).json({status:"error" , message: err})

        }
    }
    )

}
)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
