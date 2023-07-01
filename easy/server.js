const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app= express();

const PORT = 3000;

app.use(express.json())
app.use(bodyParser.json())

let ADMIN = [
    {
        username:"barath@gmail.com",
        password:"itunes@1921"
    }
]
let COURSES = [];
let USERS = [];


// middleware for admin authentication
const adminAuthentication = (req,res,next) => {
    const { username,password } = req.headers;
    const admin = ADMIN.find(a => a.username === username && a.password === password);
    if (admin){
        next();
    }else{
        res.status(403).json({message: 'Admin Login Failed'})
    }
}

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

// see all admin users
app.get("/admin/data",(req,res)=>{
    res.send(ADMIN)
})

// Admins should be able to sign up
app.post("/admin/signup",(req,res)=>{
    const user = req.body;
    const admin = ADMIN.find(a => a.username === user.username);
    if (admin){
        res.status(403).json({message: 'Admin already exists...'})
    }else{
        ADMIN.push(user)
        res.status(200).json({message: 'Admin created successfully'})
    }
})

app.get("/admin/login",adminAuthentication,(req,res)=>{
    res.status(200).send("Admin logged in successfully...")
})

app.post("/admin/courses",adminAuthentication,(req,res)=>{
    const course_input = req.body;
    const flag = COURSES.find(c => c.title === course_input.title)
    if (flag){
        res.status(403).json({message:"course already exixts"})
    }else{
        COURSES.push({
            title:course_input.title,
            description:course_input.description,
            price:course_input.price,
            imageLink:course_input.imageLink,
            publication:course_input.publication,
            courseid:COURSES.length + 1
        })
        res.status(200).json({message:"course created successfully: courseid:"})
    }
})

app.get("/admin/courses",adminAuthentication,(req,res)=>{
    res.send(COURSES)
})

// Admins should be able to sign up
app.post("/admin/signup",(req,res)=>{
    const user = req.body;
    const admin = ADMIN.find(a => a.username === user.username);
    if (admin){
        res.status(403).json({message: 'Admin already exists...'})
    }else{
        ADMIN.push(user)
        res.status(200).json({message: 'Admin created successfully'})
    }
})

app.put("/admin/courses/:courseid",adminAuthentication,(req,res)=>{
    const courseid = req.params.courseid;
    const updated_course = req.body
    for(i=0;i<COURSES.length;i++){
        if (COURSES[i].courseid == courseid){
            COURSES[i].title = updated_course.title
            COURSES[i].description = updated_course.description;
            COURSES[i].price = updated_course.price;
            COURSES[i].imageLink = updated_course.imageLink
            COURSES[i].publication = updated_course.publication
            res.status(200).json({message:"Courses updated successfully"})
        }
    }
    res.status(403).json({message:"Course not found with given id"})
})

app.listen(PORT,()=>{
    console.log("server started in port -> "+PORT)
})