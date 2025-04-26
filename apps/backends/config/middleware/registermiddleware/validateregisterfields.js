"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRegistrationFields = (req, res, next) => {
    const { username, emailid, password } = req.body;
    if (!username || !emailid || !password) {
        console.log('Missing required fields:', { username, emailid, password });
        res.status(400).json({ message: 'All fields are required.' });
        return;
    }
    next();
};
exports.default = validateRegistrationFields;
