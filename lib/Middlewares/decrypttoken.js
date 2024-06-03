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
exports.decodeReversedJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BusinessInitialization_1 = __importDefault(require("../Services/Business/BusinessInitialization"));
const SECRET_KEY = process.env.TBD_KEY;
const decodeReversedJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Changed Promise<Response> to void
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const businessMethods = new BusinessInitialization_1.default();
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return; // Ensure that no further processing happens
    }
    try {
        const reversedToken = token.split("").reverse().join(""); // Reverse the token back
        const { data } = jsonwebtoken_1.default.verify(reversedToken, SECRET_KEY);
        const existResponse = yield businessMethods.doesBusinessIDExist(data.uid);
        if (!existResponse) {
            res.status(401).json({ message: "No token provided" });
            return; // Ensure that no further processing happens
        }
        req.user_id = data.uid; // Assuming you extend the Request interface to include user_id
        next();
    }
    catch (error) {
        console.log({ error });
        res.status(401).json({ message: "Unauthorized" });
    }
});
exports.decodeReversedJwt = decodeReversedJwt;
//# sourceMappingURL=decrypttoken.js.map