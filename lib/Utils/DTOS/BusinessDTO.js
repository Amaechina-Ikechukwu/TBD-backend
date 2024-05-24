"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BusinessInformationBreakDown = (data) => {
    delete data.tenantId;
    delete data.providerData;
    delete data.isAnonymous;
    delete data.emailVerified;
    delete data.displayName;
    return data;
};
exports.default = BusinessInformationBreakDown;
//# sourceMappingURL=BusinessDTO.js.map