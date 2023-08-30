import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
const adminSecret_key = "admins3cr3tf0rjs0nw3bt0k3n";
const userSecret_key = "users3cr3tf0rjs0nw3bt0k3n";
// importing database
import {Course} from "../models/db";
// importing auths
import {adminVerifyToken,userVerifyToken} from "../auth"



// add new Course -> admin access
router.post("/add",adminVerifyToken,async(req,res): Promise<void>=>{
    const {title,description,price,imageLink,published} = req.body;
    const alreadyExists = await Course.findOne({description})
    if (alreadyExists){
        res.status(403).json({message:"Course Already exists..."})
    }else{
        try{
            const course = {
                title:title,
                description:description,
                price:price,
                imageLink:imageLink,
                published:published
            }
            const newCourse = new Course(course)
            await newCourse.save();
            console.log("New course added...")
            res.status(200).json({message:"New Course Added..."})
        }catch(error){
            res.status(404).json({message:"Error while adding new course...",error})
        }
    }
})

// delete course -> admin access
router.delete("/delete",adminVerifyToken,async(req,res)=>{
    const {title,description,price,imageLink,published} = req.body;
    const alreadyExists = await Course.findOne({title})
    if (alreadyExists){
        try{
            const deletedCourse = await Course.deleteOne({_id: new Object(alreadyExists.id)})
            res.status(200).json({message:"Course deleted...",deletedCourse})
        }catch(error){
            res.status(404).json({message:"internal error",error})
        }
    }else{
        res.status(403).json({message:"Course not found..."})
    }
})


// list all course -> user & admin access
router.get("/list",userVerifyToken || adminVerifyToken,async(req,res): Promise<void>=>{
    const listofCourses = await Course.find();
    res.status(200).json({message:"Success",listofCourses})
})


router.get("/list/:id",userVerifyToken || adminVerifyToken,async(req,res): Promise<void>=>{
    try{
        const id:any = await Object(req.params as { id: string }).id;
        const alreadyExists = await Course.findOne({_id:id});
        if (alreadyExists){
            res.status(200).json({message:"Success",alreadyExists})
        }else{
            res.status(200).json({message:"No COurse Found"})
        }
    }catch(error){
        res.status(403).json({message:"error",error})
    }

})

export default router;