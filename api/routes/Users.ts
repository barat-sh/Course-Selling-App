import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

// importing db
import {User} from "../models/db"
import { VoidExpression } from "typescript";

router.get("/data",async(req,res)=>{
    const listofusers = await User.find();
    res.send(listofusers)
})

// importing auth logins
import { verifyPassword,usergenerateToken,admingenerateToken } from "../auth";


router.post("/signup",async(req,res)=>{
    const {username,password,name,phoneNumber,gender} = req.body
    const alreadyExists = await User.findOne({username});
    if (alreadyExists){
        res.status(401).json({message:"user Already Exists... Please Login"});
        return;
    }else{
        try{
            const PASSWORD = await bcrypt.hash(password,10)
            try{
                const user = {
                    username:username,
                    password:PASSWORD,
                    name:name,
                    phoneNumber:phoneNumber,
                    gender:gender,
                }
                const newUser = new User(user)
                await newUser.save()
                console.log("New User Created...")
                res.status(200).json({message:"New User Created...",newUser})
            }catch(error){
                res.status(403).json({message:"Error while creating User",error})
            }
        }catch(error){
            res.status(403).json({message:"Error while creating user:",error})
        }        
    }
    
})

router.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    try{
        const alreadyExists = await User.findOne({username});
        if (alreadyExists?.password){
            const isMatch = await verifyPassword(password,alreadyExists.password)
            if (isMatch){
                const token = await usergenerateToken({id:alreadyExists.id})
                res.status(200).json({message:"User Logged in...",token})
            }else{
                res.status(404).json({message:"Incorrect Username or Password"})
            }
        }else{
            res.status(404).json({message:"Denied"})
        }
    }catch(error){
        res.status(404).json({message:"404 - Error",error})
    }
})

export default router;