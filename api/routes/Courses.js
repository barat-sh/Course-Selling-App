"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const adminSecret_key = "admins3cr3tf0rjs0nw3bt0k3n";
const userSecret_key = "users3cr3tf0rjs0nw3bt0k3n";
// importing database
const db_1 = require("../models/db");
// admin verification token
const adminVerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers;
    try {
        const isMatch = yield jsonwebtoken_1.default.verify(token, adminSecret_key);
        return isMatch;
    }
    catch (error) {
        console.log("Error while creating token");
        return false;
    }
    finally {
        next();
    }
});
// user verification token
const userVerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers;
    try {
        const isMatch = yield jsonwebtoken_1.default.verify(token, userSecret_key);
        return isMatch;
    }
    catch (error) {
        console.log("Error while creating token");
        return false;
    }
    finally {
        next();
    }
});
// list all course -> user & admin access
router.get("/list", userVerifyToken || adminVerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listofCourses = yield db_1.Course.find();
    res.status(200).json({ message: "Success", listofCourses });
}));
// add new Course -> admin access
router.post("/add", adminVerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, imageLink, published } = req.body;
    const alreadyExists = yield db_1.Course.findOne({ description });
    if (alreadyExists) {
        res.status(403).json({ message: "Course Already exists..." });
    }
    else {
        try {
            const course = {
                title: title,
                description: description,
                price: price,
                imageLink: imageLink,
                published: published
            };
            const newCourse = new db_1.Course(course);
            yield newCourse.save();
            console.log("New course added...");
            res.status(200).json({ message: "New Course Added..." });
        }
        catch (error) {
            res.status(404).json({ message: "Error while adding new course...", error });
        }
    }
}));
// delete course -> admin access
router.delete("/delete", adminVerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, imageLink, published } = req.body;
    const alreadyExists = yield db_1.Course.findOne({ title });
    if (alreadyExists) {
        try {
            const deletedCourse = yield db_1.Course.deleteOne({ _id: new Object(alreadyExists.id) });
            res.status(200).json({ message: "Course deleted...", deletedCourse });
        }
        catch (error) {
            res.status(404).json({ message: "internal error", error });
        }
    }
    else {
        res.status(403).json({ message: "Course not found..." });
    }
    // Course.deleteOne({title},(err:any): void=>{
    //     if (err){
    //         res.status(403).json({message:"Error while deleting course.."})
    //     }else{
    //         res.status(200).json({message:"Course Deleted..."})
    //     }
    // })
}));
exports.default = router;
