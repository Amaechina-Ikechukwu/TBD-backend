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
const firestore_1 = require("firebase-admin/firestore");
const Logger_1 = __importDefault(require("../../Utils/Logger"));
class BusinessInitialization {
    constructor() {
        this.database = (0, firestore_1.getFirestore)();
        this.businessRef = this.database.collection("business");
    }
    doesBusinessExist(business_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBusinessName = yield this.businessRef
                    .where("business_name" == business_name)
                    .get();
                if (queryBusinessName.empty) {
                    return false;
                }
                return true;
            }
            catch (error) {
                Logger_1.default.error("From Register Business", error);
                return true;
            }
        });
    }
    registerBusiness(business, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessExist = yield this.doesBusinessExist(business.business_name);
                if (businessExist) {
                    return "Business name already exist";
                }
                yield this.businessRef.doc(user_id).set(Object.assign({}, business));
                return "Business added";
            }
            catch (error) {
                Logger_1.default.error("From Register Business", error);
                return "Failed to register business";
            }
        });
    }
}
exports.default = BusinessInitialization;
//# sourceMappingURL=BusinessRegistration.js.map