"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class IndexController {
    AuthPage(req, res) {
        const filePath = path_1.default.join(__dirname, "../../Public/Login.html");
        res.sendFile(filePath);
    }
}
exports.default = IndexController;
//# sourceMappingURL=auth.js.map