const express = require('express');
const jwt = require("jsonwebtoken")
const app = express();
app.use(express.json());
const PORT = 3001


const ADMIN = [
    {
        "username":"barath@gmail.com",
        "password":"itunes@1921"
    }
];
const USERS = [];
// middle wares

const secretKey = "supers3r3c1"

const generatejwt = (user) => {
    const payload = {username: user.username};
    return jwt.sign(payload,secretKey,{expiresIn:"24h"})
}

const adminAuthJwt = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = generatejwt(authHeader);
        jwt.verify(token,secretKey,(err,data)=>{
            if (err){
                return res.sendStatus(400)
            }
            req.user = data
            next()
        })
    }else{
    res.sendStatus(401)
    }
}

const adminAuthentication = (req,res,next) =>{
    const {username,password} = req.headers;
    const flag = ADMIN.find(a => a.username === username && a.password === password);
    if (flag){
        next();
    }else{
        res.status(404).json({message:"INVALID username or password"})
    }
}

app.post("/admin/signup",(req,res)=>{
    const user = req.body;
    const flag = ADMIN.find(a => a.username === user.username);
    if (flag){
        res.status(403).json({message: "Admin Account already exists"});
    }else{
        ADMIN.push(user)
        res.status(200).json({message:"Admin account created..."});
    }
})

app.post("/admin/login",(req,res)=>{
    const {username,password} = req.body;
    const admin = ADMIN.find(a => a.username === username && a.password === password);
    if (admin){
        const accessToken = generatejwt(admin)
        res.status(200).json({message:"Admin logged-in"+accessToken})
    }else{
        res.status(403).json({message:"forbidden"})
    }
    res.send("Admin login Success")
})

app.get("/admin/data",adminAuthJwt,(req,res)=>{
    res.send("inside data"+USERS)
})

app.listen(PORT,()=>{
    console.log("server started in port "+ PORT);
})