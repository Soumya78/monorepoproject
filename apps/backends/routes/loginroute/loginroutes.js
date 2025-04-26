"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginusermiddleware_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/loginmiddleware/loginusermiddleware"));
const router = (0, express_1.Router)();
router.post('/', loginusermiddleware_1.default);
exports.default = router;
