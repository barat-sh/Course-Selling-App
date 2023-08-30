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
exports.userVerifyToken = exports.adminVerifyToken = exports.verifyPassword = exports.admintokenverify = exports.usertokenverify = exports.usergenerateToken = exports.admingenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSecret_key = "admins3cr3tk3yf0rjs0nw3bt0k3n";
const userSecret_key = "users3cr3tf0rjs0nw3bt0k3n";
const admingenerateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, adminSecret_key);
};
exports.admingenerateToken = admingenerateToken;
const usergenerateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, userSecret_key);
};
exports.usergenerateToken = usergenerateToken;
const usertokenverify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield jsonwebtoken_1.default.verify(token, userSecret_key);
        return decoded;
    }
    catch (error) {
        console.error("error", error);
        return null;
    }
});
exports.usertokenverify = usertokenverify;
const admintokenverify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield jsonwebtoken_1.default.verify(token, adminSecret_key);
        return decoded;
    }
    catch (error) {
        console.error("error", error);
        return null;
    }
});
exports.admintokenverify = admintokenverify;
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcrypt_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        console.error("Error", error);
        return false;
    }
});
exports.verifyPassword = verifyPassword;
// admin verification token
const adminVerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers;
    try {
        const isMatch = jsonwebtoken_1.default.verify(token, adminSecret_key);
        return isMatch;
    }
    catch (error) {
        console.log("Error while checking token");
        return false;
    }
    finally {
        next();
    }
});
exports.adminVerifyToken = adminVerifyToken;
// user verification token
const userVerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers;
    try {
        const isMatch = jsonwebtoken_1.default.verify(token, userSecret_key);
        return isMatch;
    }
    catch (error) {
        console.log("Error while checking token");
        return false;
    }
    finally {
        next();
    }
});
exports.userVerifyToken = userVerifyToken;
