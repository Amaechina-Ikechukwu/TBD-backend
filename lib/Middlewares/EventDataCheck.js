"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventDatacheck {
    constructor(params) {
        this.params = params;
    }
    checkIfDataIsComplete(data) {
        const missingParams = [];
        // Iterate over the params array
        for (const param of this.params) {
            if (!(param in data)) {
                missingParams.push(param);
            }
        }
        if (missingParams.length > 0) {
            return `Missing parameters: ${missingParams.join(", ")}`;
        }
        return null;
    }
}
exports.default = EventDatacheck;
//# sourceMappingURL=EventDataCheck.js.map