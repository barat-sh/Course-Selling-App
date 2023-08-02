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
exports.connectMongoDB = exports.Course = exports.Admin = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "course" }]
});
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    name: String
});
const courseScheme = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});
exports.User = mongoose_1.default.model("User", userSchema);
exports.Admin = mongoose_1.default.model("Admin", adminSchema);
exports.Course = mongoose_1.default.model("Course", courseScheme);
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "mongodb+srv://barath0121:nFuAeH5md3xWuqNt@cluster0.a8ppubw.mongodb.net/Courses?retryWrites=true&w=majority";
    try {
        yield mongoose_1.default.connect(url);
        console.log("Connected to MongoDB...");
    }
    catch (error) {
        console.error("Error while connection to connectMongoDB: ", error);
    }
});
exports.connectMongoDB = connectMongoDB;
