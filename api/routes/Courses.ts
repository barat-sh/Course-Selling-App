import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
const adminSecret_key = "admins3cr3tf0rjs0nw3bt0k3n";
const userSecret_key = "users3cr3tf0rjs0nw3bt0k3n";
// importing database
import {Course} from "../models/db";

// admin verification token
const adminVerifyToken = async(req: { headers: any; },res: any,next: () => void) => {
    const token = req.headers
    try{
        const isMatch = await jwt.verify(token,adminSecret_key)
        return isMatch
    }catch(error){
        console.log("Error while creating token")
        return false
    }finally{
        next()
    }
}

// user verification token
const userVerifyToken = async(req: { headers: any; },res: any,next: () => void) => {
    const token = req.headers
    try{
        const isMatch = await jwt.verify(token,userSecret_key)
        return isMatch
    }catch(error){
        console.log("Error while creating token")
        return false
    }finally{
        next()
    }
}

// list all course -> user & admin access
router.get("/list",userVerifyToken || adminVerifyToken,async(req,res): Promise<void>=>{
    const listofCourses = await Course.find();
    res.status(200).json({message:"Success",listofCourses})
})


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
    // Course.deleteOne({title},(err:any): void=>{
    //     if (err){
    //         res.status(403).json({message:"Error while deleting course.."})
    //     }else{
    //         res.status(200).json({message:"Course Deleted..."})
    //     }
    // })
})

export default router;