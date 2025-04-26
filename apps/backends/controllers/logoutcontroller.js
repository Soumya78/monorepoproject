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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redisclient_1 = __importDefault(require("../client/redisclient")); // adjust path if needed
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authHeader = req.headers['authorization'];
        let token = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        else if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.authtoken) {
            token = req.cookies.authtoken;
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const jiti = decoded.jiti;
        const expiresInSeconds = decoded.exp - Math.floor(Date.now() / 1000);
        yield redisclient_1.default.setex(`blackedlist:${jiti}`, expiresInSeconds, token);
        res.clearCookie('authtoken');
        console.log("Logged out successfully");
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = logoutController;
