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
const express_1 = require("express");
const auth_1 = __importDefault(require("../Controllers/Pages/auth"));
class PagesRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.auth = new auth_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.get("/pages", this.loadPage.bind(this));
    }
    loadPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.auth.AuthPage(req, res);
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = PagesRouter;
//# sourceMappingURL=pages.js.map