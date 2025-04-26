"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logoutcontroller_1 = __importDefault(require("/Users/soumya/Documents/my-monorepo/apps/backends/controllers/logoutcontroller"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    (0, logoutcontroller_1.default)(req, res);
});
exports.default = router;
