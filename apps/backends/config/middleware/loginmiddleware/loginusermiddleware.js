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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const users_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users")); // Ensure correct import path
const loginusermiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailid, password } = req.body;
    console.log(process.env.JWT_SECRET_KEY); // Make sure JWT_SECRET_KEY is set in environment variables
    try {
        const user = yield users_1.default.findOne({ emailid });
        if (!user) {
            console.log("User not found for email:", emailid);
            res.status(400).json({ message: "User not found" });
            return;
        }
        const ismatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!ismatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const jiti = (0, uuid_1.v4)();
        const token = jsonwebtoken_1.default.sign({ id: user._id, jiti }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        // Set cookie and return response
        res.cookie('authtoken', token, {
            httpOnly: true,
            secure: false, // In production, set to true if you're using HTTPS
            sameSite: 'strict',
            maxAge: 3600000,
        });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = loginusermiddleware;
