"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const path = __importStar(require("path"));
require("dotenv/config");
const calendar_1 = __importDefault(require("./Routes/calendar"));
const pages_1 = __importDefault(require("./Routes/pages"));
const tbd_json_1 = __importDefault(require("../tbd.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const firestore_1 = require("firebase-admin/firestore");
const business_1 = __importDefault(require("./Routes/business"));
const cors_1 = __importDefault(require("cors")); // Import cors
class TBDApp {
    constructor() {
        this.app = (0, express_1.default)();
        this.parseBody();
        this.initializeFirebase();
        this.configureMiddlewares();
        this.configureRoutes();
        this.startServer();
    }
    initializeFirebase() {
        const serviceAccountConfig = tbd_json_1.default;
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccountConfig),
        });
        const firestore = (0, firestore_1.getFirestore)();
        firestore.settings({ ignoreUndefinedProperties: true });
    }
    parseBody() {
        // Middleware to parse JSON bodies
        this.app.use(body_parser_1.default.json());
    }
    configureMiddlewares() {
        const corsOptions = {
            origin: ["http://localhost:3000", "https://tbd-backend.onrender.com"], // Allow only example.com
            methods: ["GET", "POST", "PUT", "DELETE"], // Allow only GET and POST requests
            // allowedHeaders: ["Content-Type"], // Allow specific headers
            credentials: true
        };
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.static(path.join(__dirname, "Public")));
        // Add any additional middlewares here
    }
    configureRoutes() {
        this.app.use(body_parser_1.default.json());
        this.app.use("/web", new pages_1.default().getRouter());
        this.app.use("/calendar", new calendar_1.default().getRouter());
        this.app.use("/business", new business_1.default().getRouter());
        // Add any additional routers here
    }
    startServer() {
        const port = process.env.PORT || 3007;
        this.app.listen(port, () => {
            console.log(`TBD launched on port ${port}`);
        });
    }
}
new TBDApp();
//# sourceMappingURL=index.js.map