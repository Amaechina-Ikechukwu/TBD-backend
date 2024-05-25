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
const BusinessDTO_1 = __importDefault(require("../../Utils/DTOS/BusinessDTO"));
class BusinessInitialization {
    constructor() {
        this.database = (0, firestore_1.getFirestore)();
        this.businessRef = this.database.collection("businesses");
    }
    getBusinessProfile(business_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBusinessName = yield this.businessRef
                    .where("uid", "==", business_uid)
                    .get();
                if (queryBusinessName.empty) {
                    return null;
                }
                let businessProfile;
                queryBusinessName.forEach((doc) => {
                    businessProfile = doc.data();
                });
                return (0, BusinessDTO_1.default)(businessProfile);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getBusinessID(business_uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBusinessName = yield this.businessRef
                    .where("uid", "==", business_uid)
                    .get();
                if (queryBusinessName.empty) {
                    return null;
                }
                let uid;
                queryBusinessName.forEach((doc) => {
                    uid = doc.id;
                });
                return uid;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    doesBusinessIDExist(business_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBusinessName = yield this.businessRef
                    .where("uid", "==", business_id)
                    .get();
                if (queryBusinessName.empty) {
                    return;
                }
                let doc_id;
                queryBusinessName.forEach((doc) => (doc_id = doc.id));
                return doc_id;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    doesBusinessExist(business_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBusinessName = yield this.businessRef
                    .where("business_name", "==", business_name)
                    .get();
                if (queryBusinessName.empty) {
                    return false;
                }
                return true;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    registerBusiness(business) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const businessExist = yield this.doesBusinessExist(business.business_name);
                const businessID = yield this.doesBusinessIDExist(business.uid);
                if (businessExist) {
                    return "Business name already exist";
                }
                if (businessID) {
                    yield this.businessRef.doc(businessID).update(Object.assign({}, business));
                    return "Business profile updated";
                }
                yield this.businessRef.doc().set(Object.assign({}, business));
                return "Business added";
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = BusinessInitialization;
//# sourceMappingURL=BusinessRegistration.js.map