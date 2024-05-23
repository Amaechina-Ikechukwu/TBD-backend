import { CreateEvent } from "../Interfaces/calendarInterfaces";

class EventDatacheck {
  private params: any;

  constructor(params: any) {
    this.params = params;
  }

  checkIfDataIsComplete(data: CreateEvent): string | null {
    const missingParams: string[] = [];

    // Iterate over the params array
    for (const param of this.params) {
      if (!(param in data)) {
        missingParams.push(param);
      }
    }

    if (missingParams.length > 0) {
      return `Missing parameters: ${missingParams.join(", ")}`;
    }

    return null;
  }
}
export default EventDatacheck;
