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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const userSecret_key = "users3cr3tf0rjs0nw3bt0k3n";
// importing db
const db_1 = require("../models/db");
router.get("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listofusers = yield db_1.User.find();
    res.send(listofusers);
}));
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, userSecret_key);
};
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcrypt_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        return false;
    }
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name, phoneNumber, gender } = req.body;
    const alreadyExists = yield db_1.User.findOne({ username });
    if (alreadyExists) {
        res.status(401).json({ message: "user Already Exists... Please Login" });
        return;
    }
    else {
        try {
            const PASSWORD = yield bcrypt_1.default.hash(password, 10);
            try {
                const user = {
                    username: username,
                    password: PASSWORD,
                    name: name,
                    phoneNumber: phoneNumber,
                    gender: gender,
                };
                const newUser = new db_1.User(user);
                yield newUser.save();
                console.log("New User Created...");
                res.status(200).json({ message: "New User Created...", newUser });
            }
            catch (error) {
                res.status(403).json({ message: "Error while creating User", error });
            }
        }
        catch (error) {
            res.status(403).json({ message: "Error while creating user:", error });
        }
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const alreadyExists = yield db_1.User.findOne({ username });
        if (alreadyExists === null || alreadyExists === void 0 ? void 0 : alreadyExists.password) {
            const isMatch = yield verifyPassword(password, alreadyExists.password);
            if (isMatch) {
                const token = yield generateToken({ id: alreadyExists.id });
                res.status(200).json({ message: "User Logged in...", token });
            }
            else {
                res.status(404).json({ message: "Incorrect Username or Password" });
            }
        }
        else {
            res.status(404).json({ message: "Denied" });
        }
    }
    catch (error) {
        res.status(404).json({ message: "404 - Error", error });
    }
}));
exports.default = router;
