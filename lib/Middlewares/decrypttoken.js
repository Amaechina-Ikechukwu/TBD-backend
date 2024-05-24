"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeReversedJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.TBD_KEY;
const decodeReversedJwt = (req, res, next) => {
    var _a;
    // Changed Promise<Response> to void
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return; // Ensure that no further processing happens
    }
    try {
        const reversedToken = token.split("").reverse().join(""); // Reverse the token back
        const decoded = jsonwebtoken_1.default.verify(reversedToken, SECRET_KEY);
        req.user_id = decoded.uid; // Assuming you extend the Request interface to include user_id
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.decodeReversedJwt = decodeReversedJwt;
//# sourceMappingURL=decrypttoken.js.map