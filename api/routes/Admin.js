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
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
// importing databases
const db_1 = require("../models/db");
// importing login auths
const auth_1 = require("../auth");
router.get("/allusers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listofUsers = yield db_1.User.find();
        if (listofUsers) {
            res.status(200).json(listofUsers);
        }
        else {
            res.status(200).json({ message: "No User found" });
        }
    }
    catch (error) {
        res.status(403).json({ message: "Error while fetching Data:", error });
    }
}));
router.get("/alladmins", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listofAdmins = yield db_1.Admin.find();
        if (listofAdmins) {
            res.status(200).json(listofAdmins);
        }
        else {
            res.status(200).json({ message: "No Admin found" });
        }
    }
    catch (error) {
        res.status(403).json({ message: "Error while fetching Data:", error });
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name } = req.body;
    const alreadyExists = yield db_1.Admin.findOne({ username });
    if (alreadyExists) {
        res.status(403).json({ message: "Admin Already exists...Please login" });
    }
    else {
        try {
            const PASSWORD = yield bcrypt_1.default.hash(password, 10);
            try {
                const admin = {
                    username: username,
                    password: PASSWORD,
                    name: name
                };
                const newAdmin = new db_1.Admin(admin);
                yield newAdmin.save();
                console.log("New Admin Created");
                res.status(200).json({ message: "Admin Account created...", newAdmin });
            }
            catch (error) {
                res.status(404).json({ message: "Error while creating New Admin:", error });
            }
        }
        catch (error) {
            res.status(403).json({ message: "Error while creating Admin:", error });
        }
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const alreadyExists = yield db_1.Admin.findOne({ username });
        if (alreadyExists === null || alreadyExists === void 0 ? void 0 : alreadyExists.password) {
            const isMatch = yield (0, auth_1.verifyPassword)(password, alreadyExists.password);
            if (isMatch) {
                const token = (0, auth_1.admingenerateToken)({ id: alreadyExists.id });
                res.status(200).json({ message: "Admin Logged in...", token });
            }
            else {
                res.status(404).json({ message: "Incorrect Username or Password" });
            }
        }
        else {
            res.status(404).json({ message: "Access Denied" });
        }
    }
    catch (error) {
        res.status(404).json({ message: "404 - Error", error });
    }
}));
exports.default = router;
