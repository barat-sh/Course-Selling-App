const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const USERS = [];
const ADMIN = [
    {
        "username":"barath@gmail.com",
        "password":"itunes@1921",
        "id":1
    },
    {
        "username":"barath@outlook.com",
        "password":"itunes@1921",
        "id":1
    }
];

const secretKey = "sup3rs3cr3t";

app.get("/",(req,res)=>{
    res.send("hello")
})

// access token creation

const generateJWT = (id) =>{
    return jwt.sign(id,secretKey)
}

// admin

app.post("/admin/signup",(req,res)=>{
    const admin_signup_input = req.body;
    const adminExists = ADMIN.find(a => a.username === admin_signup_input.username);
    if (adminExists){
        res.status(403).json({error:"Admin already exists"})
    }else{
        ADMIN.push({...admin_signup_input,id:ADMIN.length +1})
        res.status(200).json({mesage:"Admin Created"})
    }
})

// login route

app.post("/admin/login",(req,res)=>{
    const admin_login_input = req.headers;
    const adminExists = ADMIN.find(a => a.username === admin_login_input.username && a.password === admin_login_input.password);
    if (adminExists){
        const accessToken = "bearer"+" " + generateJWT(adminExists.id)
        res.cookie("access-token",accessToken,{maxAge:60*60*24*1000})
        res.json({mesage:"logged-in"})
    }else{
        res.status(404).json({mesage:"Incorrect username or password"})
    }
})

app.listen(3001,(req,res)=>{
    console.log("server started in port 3001..")
})