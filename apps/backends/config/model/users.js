"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
// Create the user schema
const userSchema = new mongoose_1.Schema({
    userid: { type: String, default: () => (0, uuid_1.v4)() },
    emailid: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    secret: { type: String, required: true }
});
// Create the model using the schema and interface
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
