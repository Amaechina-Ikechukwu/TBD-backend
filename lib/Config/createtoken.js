"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.TBD_KEY;
const generateToken = (data) => {
    const token = jsonwebtoken_1.default.sign({ data }, SECRET_KEY, { expiresIn: "14d" });
    return token.split("").reverse().join(""); // Reverse the token
};
exports.generateToken = generateToken;
//# sourceMappingURL=createtoken.js.map