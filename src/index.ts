import express from "express";
import admin from "firebase-admin";
import serviceAccount from "./Config/tbd.json";
import path from "path";
import "dotenv/config";
import pagesRouter from "./Routes/pages";

import calendarRouter from "./Routes/calendar";
const app = express();
const serviceAccountConfig: admin.ServiceAccount =
  serviceAccount as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountConfig),
});
// profilerouter.use((err, req, res, next) => {
//   console.error(err); // Log the error for debugging purposes
//   res.status(500).json({ error: "Something went wrong" });
// });
app.use("/", pagesRouter);
app.use("/calendar", calendarRouter);
app.use(express.static(path.join(__dirname, "Public")));
app.listen(3007, () => {
  console.log("TBD launched");
});
