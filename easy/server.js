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
let USERS = [
    {
        username:"barath@gmail.com",
        password:"itunes@1921"
    }
];


// admin

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
    const course_input = {...req.body,courseid:COURSES.length +1};
    const flag = COURSES.find(c => c.title === course_input.title)
    if (flag){
        res.status(403).json({message:"course already exixts"})
    }else{
        COURSES.push(course_input)
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
    const flag = COURSES.find(c => c.id == courseid);
    if (flag){
        Object.assign(flag,updated_course)
    }else{
        res.status(403).json({message:"Course not found with given id"})
    }
})


// users

const userAuthentication = (req,res,next) =>{
    const { username,password } = req.headers
    const user = USERS.find(u => u.username === username && u.password === password);
    if(user){
        req.user = user;
        next();
    }else{
        res.status(403).json({message:"Admin Authentication Failed"});
    }
}

app.post("/users/signup",(req,res)=>{
    const user = {...req.body,purchasedCourse: []}
    const flag = USERS.find(u => u.username === user.username);
    if (flag){
        res.status(403).json({message:"User account already exists"});
    }else{
        USERS.push(user)
        res.status(200).json({message:"User account created successfully"});
    }
})


app.post("/users/login",userAuthentication,(req,res)=>{
    res.status(200).json({message:"user login successful"});
})

app.post("/users/courses",userAuthentication,(req,res)=>{
    const courses = COURSES.filter(c=>c.published)
    res.status(200).json(courses)
})

app.post("/users/courses/:courseid",userAuthentication,(req,res)=>{
    const courseid = req.params.courseid;
    const course = COURSES.find(c => c.courseid === courseid && c.published)
    if(course){
        req.user.purchasedCourse.push(courseid)
        res.status(200).json({message:"Course puschased.."})
    }else{
        res.status(404).json({message:"Unable to purchase course"})
    }
})

app.get("/users/purchasedCourses",userAuthentication,(req,res)=>{
    const purchasedCourseids = req.user.purchasedCourse;
    let purchasedCourses = [];
    for (i=0;i<COURSES.length;i++){
        if(purchasedCourseids.indexOf(COURSES[i].courseid) !== -1){
            purchasedCourses.push(COURSES[i])
        }
    }
    res.json(purchasedCourses)
})
app.listen(PORT,()=>{
    console.log("server started in port -> "+PORT)
})