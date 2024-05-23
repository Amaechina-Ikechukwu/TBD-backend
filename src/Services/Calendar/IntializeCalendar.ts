import fs from "fs/promises";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import path from "path";

class CalendarInitialization {
  private readonly SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];
  private readonly TOKEN_PATH = path.join(process.cwd(), "token.json");
  private readonly CREDENTIALS_PATH = path.join(process.cwd(), "tbd-cred.json");
  async loadSavedCredentialsIfExists() {
    try {
      const content = await fs.readFile(this.TOKEN_PATH, "utf-8");
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  async saveCredentials(client: any) {
    const content = await fs.readFile(this.CREDENTIALS_PATH, "utf-8");
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(this.TOKEN_PATH, payload);
  }
  async authorize() {
    let client: any = await this.loadSavedCredentialsIfExists();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: this.SCOPES,
      keyfilePath: this.CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await this.saveCredentials(client);
    }
    return client;
  }
  async listEvents(auth: any) {
    const eventsArray: any = [];

    const calendar = google.calendar({ version: "v3", auth });
    const res = await calendar.events.list({
      calendarId: "amaechinaikechukwu6@gmail.com",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = res.data.items;
    if (!events || events.length === 0) {
      return eventsArray;
    }

    events.map((event, i) => {
      // const start = event.start.dateTime || event.start.date;
      // const end = event.end.dateTime || event.end.date;
      // const eventId = event.id;

      eventsArray.push({ ...event });
    });
    return eventsArray;
  }
  async initialize() {
    return this.authorize()
      .then((auth) => this.listEvents(auth))
      .catch(console.error);
  }
}
export default CalendarInitialization;
