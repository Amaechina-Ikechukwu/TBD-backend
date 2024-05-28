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
const Business_1 = __importDefault(require("../Controllers/Business"));
const Logger_1 = __importDefault(require("../Utils/Logger"));
const checkParametersMiddleware_1 = __importDefault(require("../Middlewares/checkParametersMiddleware"));
const decrypttoken_1 = require("../Middlewares/decrypttoken");
class BusinessRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.business = new Business_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/exists", (0, checkParametersMiddleware_1.default)(["business_name"]), this.checkIfBusinessNameExist.bind(this));
        this.router.get("/profile", (0, checkParametersMiddleware_1.default)(["business_uid"]), this.getBusinessInformation.bind(this));
        this.router.post("/profile", (0, checkParametersMiddleware_1.default)([
            "uid",
            "email",
            "photoURL",
            "emailVerified",
            "phoneNumber",
            "isAnonymous",
            "tenantId",
            "providerData",
            "business_name",
            "business_description",
            "business_bank_name",
            "business_bank_account_number",
            "business_bank_account_name",
            "business_facebook_link",
            "business_instagram_link",
            "business_twitter_link",
            "business_phone_number",
        ]), this.createBusiness.bind(this));
        this.router.put("/profile", decrypttoken_1.decodeReversedJwt, this.updateBusiness.bind(this));
        this.router.use(this.errorHandler.bind(this));
    }
    getBusinessInformation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.business.businessProfile(req, res);
            }
            catch (error) {
                next(error);
            }
        });
    }
    checkIfBusinessNameExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.business.doBusinessExist(req, res);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createBusiness(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.business.createBusiness(req, res);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateBusiness(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.business.updateBusiness(req, res);
            }
            catch (error) {
                next(error);
            }
        });
    }
    errorHandler(error, req, res, next) {
        Logger_1.default.error("From business router", error);
        res.status(500).json({ error: "Something went wrong" });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = BusinessRouter;
//# sourceMappingURL=business.js.map