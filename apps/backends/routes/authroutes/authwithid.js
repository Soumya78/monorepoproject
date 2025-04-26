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
const users_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users")); // Assuming default export for User model
const router = express_1.default.Router();
router.get("/:userid", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userid } = req.params; // Get user ID from route parameters
            console.log("User id", userid);
            // Find user in the database
            const user = yield users_1.default.findOne({ userid });
            console.log("User found", user);
            // If no user found, send 404
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }
            else {
                // If user found, send user data with 200 status
                res.status(200).json({ message: "User found", user });
            }
        }
        catch (err) {
            console.log("Error in getting user", err);
            // Catch errors and send 500 status code for internal server error
            res.status(500).json({ message: "Internal server error" });
        }
    });
});
exports.default = router;
