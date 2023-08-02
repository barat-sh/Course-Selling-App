import express from "express";
import cors from "cors";
import {connectMongoDB} from "./models/db";
const app = express()
app.use(express.json())
const PORT:number = 3001;
app.use(cors());

// connection to mongoDB
connectMongoDB()

// importing routes
import userRoute from "./routes/Users";
import adminRoute from "./routes/Admin";
import courseRoute from "./routes/Courses"

app.use("/user",userRoute)
app.use("/admin",adminRoute)
app.use("/course",courseRoute)

app.listen(PORT,():void=>{
    console.log("server hitting...")
})
// mongodb+srv://barath0121:nFuAeH5md3xWuqNt@cluster0.a8ppubw.mongodb.net/
