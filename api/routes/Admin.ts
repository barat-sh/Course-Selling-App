import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

// importing databases

import {User,Admin,Course} from "../models/db";
import { addSyntheticTrailingComment } from "typescript";
// importing login auths
import { verifyPassword,usergenerateToken, admingenerateToken } from "../auth";

router.get("/allusers",async(req,res)=>{
    try{
        const listofUsers = await User.find();
        if (listofUsers){
            res.status(200).json(listofUsers)
        }else{
            res.status(200).json({message:"No User found"})
        }
    }catch(error){
        res.status(403).json({message:"Error while fetching Data:",error})
    }
})

router.get("/alladmins",async(req,res)=>{
    try{
        const listofAdmins = await Admin.find();
        if (listofAdmins){
            res.status(200).json(listofAdmins)
        }else{
            res.status(200).json({message:"No Admin found"})
        }
    }catch(error){
        res.status(403).json({message:"Error while fetching Data:",error})
    }
})

router.post("/signup",async(req,res)=>{
    const {username,password,name} = req.body;
    const alreadyExists = await Admin.findOne({username})
    if (alreadyExists){
        res.status(403).json({message:"Admin Already exists...Please login"})
    }else{
        try{
            const PASSWORD = await bcrypt.hash(password,10)
            try{
                const admin = {
                    username:username,
                    password:PASSWORD,
                    name:name
                }
                const newAdmin= new Admin(admin);
                await newAdmin.save();
                console.log("New Admin Created")
                res.status(200).json({message:"Admin Account created...",newAdmin})
            }catch(error){
                res.status(404).json({message:"Error while creating New Admin:",error})
            }
        }catch(error){
            res.status(403).json({message:"Error while creating Admin:",error})
        }
    }
})

router.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    try{
        const alreadyExists = await Admin.findOne({username});
        if (alreadyExists?.password){
            const isMatch = await verifyPassword(password,alreadyExists.password)
            if (isMatch){
                const token = admingenerateToken({id:alreadyExists.id})
                res.status(200).json({message:"Admin Logged in...",token})
            }else{
                res.status(404).json({message:"Incorrect Username or Password"})
            }
        }else{
            res.status(404).json({message:"Access Denied"})
        }
    }catch(error){
        res.status(404).json({message:"404 - Error",error})
    }
})


export default router;