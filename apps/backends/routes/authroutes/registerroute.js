"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("express");
const checkuserexists_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/registermiddleware/checkuserexists");
const generatetoken_1 = __importDefault(require("../../config/middleware/registermiddleware/generatetoken"));
const hashpassword_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/utils/hashpassword"));
const saveusertodb_1 = __importDefault(require("../../config/middleware/registermiddleware/saveusertodb"));
const validateregisterfields_1 = __importDefault(require("../../config/middleware/registermiddleware/validateregisterfields"));
const sendusertoqueue_1 = __importDefault(require("../../config/middleware/sendusertoqueue/sendusertoqueue"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post('/', checkuserexists_1.checkUserExists, generatetoken_1.default, hashpassword_1.default, saveusertodb_1.default, sendusertoqueue_1.default, validateregisterfields_1.default, (req, res) => {
    console.log('Checking registration process');
    // You can handle response or additional logic if needed
    res.status(200).send('Registration Successful'); // Modify response as needed
});
exports.default = router;
