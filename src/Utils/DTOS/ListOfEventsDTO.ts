import { CalendarListEvent } from "../../Interfaces/calendarInterfaces";

export const ListOfEventDTO = (data: CalendarListEvent) => {
  delete data.created;
  delete data.etag;
  delete data.iCalUID;
  delete data.updated;
  delete data.htmlLink;
  delete data.kind;
  return data;
};
