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
const IntializeCalendar_1 = __importDefault(require("../../Services/Calendar/IntializeCalendar"));
const Logger_1 = __importDefault(require("../../Utils/Logger"));
const EventCreation_1 = __importDefault(require("../../Services/Calendar/EventCreation"));
const BusinessRegistration_1 = __importDefault(require("../../Services/Business/BusinessRegistration"));
class Events {
    events(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listOfEvents = new IntializeCalendar_1.default();
                const business_id = req.query.business_id;
                const { email } = yield new BusinessRegistration_1.default().getBusinessProfile(business_id);
                const result = yield listOfEvents.initialize(email);
                res.status(200).json({ result });
            }
            catch (err) {
                Logger_1.default.error("From list of events", err);
                throw new Error(err);
            }
        });
    }
    createEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const create = new EventCreation_1.default();
                const data = req.body;
                const business_id = req.query.business_id;
                yield create.createEvent(data, business_id);
                res.status(200).json({ result: "Event Created" });
            }
            catch (err) {
                Logger_1.default.error("From create events", err);
                throw new Error(err);
            }
        });
    }
}
exports.default = Events;
//# sourceMappingURL=Events.js.map