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
const promises_1 = __importDefault(require("fs/promises"));
const process_1 = __importDefault(require("process"));
const local_auth_1 = require("@google-cloud/local-auth");
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ListOfEventsDTO_1 = require("../../Utils/DTOS/ListOfEventsDTO");
class CalendarInitialization {
    constructor() {
        this.SCOPES = [
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/calendar.events",
        ];
        this.TOKEN_PATH = path_1.default.join(process_1.default.cwd(), "token.json");
        this.CREDENTIALS_PATH = path_1.default.join(process_1.default.cwd(), "tbd-cred.json");
    }
    loadSavedCredentialsIfExists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield promises_1.default.readFile(this.TOKEN_PATH, "utf-8");
                const credentials = JSON.parse(content);
                return googleapis_1.google.auth.fromJSON(credentials);
            }
            catch (err) {
                return null;
            }
        });
    }
    saveCredentials(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield promises_1.default.readFile(this.CREDENTIALS_PATH, "utf-8");
            const keys = JSON.parse(content);
            const key = keys.installed || keys.web;
            const payload = JSON.stringify({
                type: "authorized_user",
                client_id: key.client_id,
                client_secret: key.client_secret,
                refresh_token: client.credentials.refresh_token,
            });
            yield promises_1.default.writeFile(this.TOKEN_PATH, payload);
        });
    }
    authorize() {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield this.loadSavedCredentialsIfExists();
            if (client) {
                return client;
            }
            client = yield (0, local_auth_1.authenticate)({
                scopes: this.SCOPES,
                keyfilePath: this.CREDENTIALS_PATH,
            });
            if (client.credentials) {
                yield this.saveCredentials(client);
            }
            return client;
        });
    }
    listEvents(auth, business_email) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventsArray = [];
            const calendar = googleapis_1.google.calendar({ version: "v3", auth });
            const res = yield calendar.events.list({
                calendarId: business_email,
                timeMin: new Date().toISOString(),
                maxResults: 2500,
                singleEvents: true,
                orderBy: "startTime",
            });
            const events = res.data.items;
            if (!events || events.length === 0) {
                return eventsArray;
            }
            events.map((event, i) => {
                eventsArray.push(Object.assign({}, (0, ListOfEventsDTO_1.ListOfEventDTO)(event)));
            });
            return eventsArray;
        });
    }
    initialize(business_email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authorize()
                .then((auth) => this.listEvents(auth, business_email))
                .catch(console.error);
        });
    }
}
exports.default = CalendarInitialization;
//# sourceMappingURL=IntializeCalendar.js.map