import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    password:{
        type:String,
        required:true,
        },
    name:{
        type:String,
        required:true,
        },
    gender:{
        type:String,
        required:true
        },
    phoneNumber:{
        type:String,
        required:true
        },
    username:{
        type:String,
        required:true,
        },
    purchasedCourses: [{type:mongoose.Schema.Types.ObjectId,ref:"course"}]
})

const adminSchema = new mongoose.Schema({
    username:String,
    password:String,
    name:String
})

const courseScheme = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published:Boolean
})

export const User = mongoose.model("User",userSchema);
export const Admin = mongoose.model("Admin",adminSchema);
export const Course = mongoose.model("Course",courseScheme);

export const connectMongoDB = async() => {
    const url = "mongodb+srv://barath0121:nFuAeH5md3xWuqNt@cluster0.a8ppubw.mongodb.net/Courses?retryWrites=true&w=majority";
    try{
        await mongoose.connect(url);
        console.log("Connected to MongoDB...")
    }catch(error){
        console.error("Error while connection to connectMongoDB: ",error)
    }
}