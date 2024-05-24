export interface CreateEvent {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees: [
    {
      email: string;
    }
  ];
}
interface CreatorOrOrganizer {
  email: string;
  self: boolean;
}

interface DateTime {
  dateTime: string;
  timeZone: string;
}

interface Attendee {
  email: string;
  displayName: string;
  responseStatus: string;
  comment: string;
}

interface Reminders {
  useDefault: boolean;
}

export interface CalendarListEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: CreatorOrOrganizer;
  organizer: CreatorOrOrganizer;
  start: DateTime;
  end: DateTime;
  iCalUID: string;
  sequence: number;
  attendees: Attendee[];
  reminders: Reminders;
  eventType: string;
}
