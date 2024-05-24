"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to check required parameters
const checkParametersMiddleware = (requiredParams) => {
    return (req, res, next) => {
        const missingParams = [];
        // Check if req.body or req.query is undefined
        if (!req.body && !req.query) {
            return res.status(400).json({
                message: "Invalid request: No request body or query parameters provided",
            });
        }
        // Iterate over the requiredParams array
        for (const param of requiredParams) {
            if (!(param in req.body) && !(param in req.query)) {
                missingParams.push(param);
            }
        }
        if (missingParams.length > 0) {
            return res.status(400).json({
                message: `Please provide the following parameters: ${missingParams.join(", ")}`,
            });
        }
        // All required parameters are present, proceed to the next middleware/route handler
        return next();
    };
};
exports.default = checkParametersMiddleware;
//# sourceMappingURL=checkParametersMiddleware.js.map