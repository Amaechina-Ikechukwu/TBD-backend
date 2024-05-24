"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston_1.transports.File({ filename: "logs/combined.log" }),
    ],
    exceptionHandlers: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "logs/exceptions.log" }),
    ],
    rejectionHandlers: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "logs/rejections.log" }),
    ],
});
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
}
exports.default = logger;
//# sourceMappingURL=Logger.js.map