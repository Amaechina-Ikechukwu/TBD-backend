import express, { Express } from "express";
import admin, { ServiceAccount } from "firebase-admin";
import * as path from "path";
import "dotenv/config";
import CalendarRouter from "./Routes/calendar";
import PagesRouter from "./Routes/pages";
import serviceAccount from "../tbd.json";
import bodyParser from "body-parser";
import { getFirestore } from "firebase-admin/firestore";
import BusinessRouter from "./Routes/business";
import cors from "cors"; // Import cors

class TBDApp {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.parseBody();
    this.initializeFirebase();
    this.configureMiddlewares();
    this.configureRoutes();
    this.startServer();
  }

  private initializeFirebase(): void {
    const serviceAccountConfig: ServiceAccount =
      serviceAccount as ServiceAccount;

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountConfig),
    });
    const firestore = getFirestore();
    firestore.settings({ ignoreUndefinedProperties: true });
  }
  private parseBody(): void {
    // Middleware to parse JSON bodies
    this.app.use(bodyParser.json());
  }
  private configureMiddlewares(): void {
    const corsOptions = {
      origin: ["http://localhost:3000", "https://tbd-backend.onrender.com"], // Allow only example.com
      methods: ["GET", "POST", "PUT", "DELETE"], // Allow only GET and POST requests
      // allowedHeaders: ["Content-Type"], // Allow specific headers
      credentials: true
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.static(path.join(__dirname, "Public")));
    // Add any additional middlewares here
  }

  private configureRoutes(): void {
    this.app.use(bodyParser.json());
    this.app.use("/web", new PagesRouter().getRouter());
    this.app.use("/calendar", new CalendarRouter().getRouter());
    this.app.use("/business", new BusinessRouter().getRouter());
    // Add any additional routers here
  }

  private startServer(): void {
    const port = process.env.PORT || 3007;
    this.app.listen(port, () => {
      console.log(`TBD launched on port ${port}`);
    });
  }
}

new TBDApp();
