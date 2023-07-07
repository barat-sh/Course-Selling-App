const express = require('express');
const {sequelize} = require("sequelize")
const mysql = require("mysql2")
const app = express();
app.use(express.json())


// importing database

const db= require("./models")

// importing routes
const usersRoute = require("./routes/Users")

// using routes
app.use("/user",usersRoute)


db.sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log("server Hitting...")
    })
})
