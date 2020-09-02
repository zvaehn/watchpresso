export interface ArchiveStore {
  archive: Array<TimeEntryInterface>;
}

export interface TimeEntryInterface {
  id: number;
  time: number;
  date: number;
}

export default class TimeEntry implements TimeEntryInterface {
  id: number;

  time: number;

  date: number;

  constructor(data: TimeEntryInterface) {
    this.id = data.id;
    this.time = data.time;
    this.date = data.date;
  }
}
