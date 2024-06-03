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
const googleapis_1 = require("googleapis");
const IntializeCalendar_1 = __importDefault(require("./IntializeCalendar"));
const Logger_1 = __importDefault(require("../../Utils/Logger"));
const BusinessInitialization_1 = __importDefault(require("../Business/BusinessInitialization"));
class EventCreation {
    createEvent(data, business_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const business_information = new BusinessInitialization_1.default();
                const { email } = yield business_information.getBusinessProfile(business_id);
                //Getting the auth from CalendarInitialization folder
                const authorizeCalendar = new IntializeCalendar_1.default();
                const auth = yield authorizeCalendar.authorize();
                const calendar = googleapis_1.google.calendar({ version: "v3", auth });
                const response = yield calendar.events.insert({
                    calendarId: email,
                    requestBody: data,
                });
                return response;
            }
            catch (err) {
                Logger_1.default.error("Event creation", err);
                throw new Error(err);
            }
        });
    }
}
exports.default = EventCreation;
//# sourceMappingURL=EventCreation.js.map