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
const Events_1 = __importDefault(require("../Controllers/Calendar/Events"));
const Logger_1 = __importDefault(require("../Utils/Logger"));
const checkParametersMiddleware_1 = __importDefault(require("../Middlewares/checkParametersMiddleware"));
class CalendarRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.calendar = new Events_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/events", (0, checkParametersMiddleware_1.default)(["business_id"]), this.getEvents.bind(this));
        this.router.post("/events", (0, checkParametersMiddleware_1.default)([
            "summary",
            "description",
            "attendees",
            "start",
            "end",
        ]), this.createEvent.bind(this));
        this.router.use(this.errorHandler.bind(this));
    }
    getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.calendar.events(req, res);
            }
            catch (err) {
                next(err);
            }
        });
    }
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.calendar.createEvents(req, res);
            }
            catch (err) {
                next(err);
            }
        });
    }
    errorHandler(err, req, res, next) {
        Logger_1.default.error("From calendar Router", err);
        res.status(500).json({ error: "Something went wrong" });
    }
    getRouter() {
        return this.router;
    }
}
exports.default = CalendarRouter;
//# sourceMappingURL=calendar.js.map