"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./models/db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3001;
app.use((0, cors_1.default)());
// connection to mongoDB
(0, db_1.connectMongoDB)();
// importing routes
const Users_1 = __importDefault(require("./routes/Users"));
const Admin_1 = __importDefault(require("./routes/Admin"));
const Courses_1 = __importDefault(require("./routes/Courses"));
app.use("/user", Users_1.default);
app.use("/admin", Admin_1.default);
app.use("/course", Courses_1.default);
app.listen(PORT, () => {
    console.log("server hitting...");
});
// mongodb+srv://barath0121:nFuAeH5md3xWuqNt@cluster0.a8ppubw.mongodb.net/
