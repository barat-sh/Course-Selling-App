const express = require("express")
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

router.use(express.json())
require('dotenv').config();

// secret key for jwt

JWT_SECRET_KEY = "macbookm2air" //requested to change
// importing database

const {Users: Users, sequelize} = require('../models');

async function hash(password){
    const hashedPassword = await bcrypt.hash(password,10)
    return hashedPassword
}

router.get("/data",async(req,res)=>{
    const listofUser = await Users.findAll();
    res.json(listofUser)
})

router.post("/signup",async(req,res)=>{
    const newUser = req.body
    const alreadyExists = await Users.findAll({where:{username:newUser.username}})
    if (alreadyExists.find(u => u.username === newUser.username)){
        res.status(403).json({message:"already exists"})
    }
    try{
        bcrypt.hash(newUser.password,10).then((hash)=>{
            Users.create({
                username:newUser.username,
                password:hash,
                name:newUser.name
            })
        })
        res.json({message:"User Created"})
    }catch(error){
        res.status(403).json({message:"Something went wrong "+error})
    }
})

router.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    const alreadyExists = await Users.findOne({where:{username:username}});
    if (alreadyExists){
        bcrypt.compare(password,alreadyExists.password).then((match)=>{
            if (!match){
                res.status(404).json({message:"Incorrect Password"})
            }else{
                jwt.sign({username:alreadyExists.username,id:alreadyExists.id},JWT_SECRET_KEY,(err,data)=>{
                    if (err){
                        res.status(404).json({message:err})
                    }else{
                        res.status(200).cookie(data).json("Logged in...")
                    }
                })
            }
        })
    }else{
        res.status(403).json({message:"User not found"})
    }
})

module.exports = router