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
const uuid_1 = require("uuid");
const users_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users")); // Update with actual path
// Middleware function to create a new user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid, username, emailid, password, secret } = req.body;
        // Create a new user object with a generated UUID if 'userid' is not provided
        const newUser = new users_1.default({
            username,
            emailid,
            password,
            secret,
            userid: userid || (0, uuid_1.v4)(), // Generate a new UUID if 'userid' is not provided
        });
        // Save the new user to the database
        const saveduser = yield newUser.save();
        // Respond with the created user information
        res.status(201).json({ message: 'User created successfully', userid: saveduser.userid });
    }
    catch (err) {
        // Handle errors during user creation
        console.error('Error saving user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = createUser;
