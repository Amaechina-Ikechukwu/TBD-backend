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
const BusinessInitialization_1 = __importDefault(require("../../Services/Business/BusinessInitialization"));
const Logger_1 = __importDefault(require("../../Utils/Logger"));
const createtoken_1 = require("../../Config/createtoken");
const auth_1 = require("firebase-admin/auth");
class BusinessIndex {
    constructor() {
        this.businessMethods = new BusinessInitialization_1.default();
    }
    doBusinessExist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business_name = req.query.business_name;
                const result = yield this.businessMethods.doesBusinessExist(business_name);
                res.status(200).json({
                    result,
                });
            }
            catch (error) {
                Logger_1.default.error("From create business controller", error);
                throw new Error(error);
            }
        });
    }
    createToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRecord = yield (0, auth_1.getAuth)().getUser(req.body.uid);
                if (!userRecord) {
                    res.status(403).json({
                        result: "Not valid user credentials",
                    });
                }
                const token = (0, createtoken_1.generateToken)(req.body);
                res.status(200).json({
                    result: token,
                });
            }
            catch (error) {
                if (error.code === "auth/user-not-found") {
                    res.status(403).json({
                        result: "Not valid user credentials",
                    });
                }
                else {
                    Logger_1.default.error("From create business controller", error.message);
                    res.status(500).json({
                        error: "An error occurred while creating the token",
                        details: error.message,
                    });
                }
            }
        });
    }
    businessID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business_uid = req.query.business_uid;
                const result = yield this.businessMethods.getBusinessID(business_uid);
                return result;
            }
            catch (error) {
                Logger_1.default.error("From create business controller", error);
                throw new Error(error);
            }
        });
    }
    businessProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business_uid = req.query.business_uid;
                const result = yield this.businessMethods.getBusinessProfile(business_uid);
                res.status(200).json({
                    result,
                });
            }
            catch (error) {
                Logger_1.default.error("From create business controller", error);
                throw new Error(error);
            }
        });
    }
    updateBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield this.businessMethods.updateBusinessProfile(data, req.user_id);
                if (result == "Business does not exist") {
                    res.status(403).json({
                        result,
                    });
                    return;
                }
                res.status(200).json({
                    result,
                });
            }
            catch (error) {
                Logger_1.default.error("From create business controller", error);
                throw new Error(error);
            }
        });
    }
    createBusiness(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield this.businessMethods.registerBusiness(data);
                if (result == "Business name already exist" ||
                    result == "Business Id already exists") {
                    res.status(403).json({
                        result,
                    });
                    return;
                }
                res.status(200).json({
                    result: {
                        business_id: data.uid,
                        result,
                    },
                });
            }
            catch (error) {
                Logger_1.default.error("From create business controller", error);
                throw new Error(error);
            }
        });
    }
}
exports.default = BusinessIndex;
//# sourceMappingURL=index.js.map