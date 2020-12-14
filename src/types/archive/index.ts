export interface ArchiveStore {
  archive: Array<TimeEntryInterface>;
}

export interface GroupedArchive {
  [key: string]: TimeEntryInterface[];
}

export interface TimeEntryInterface {
  id: number;
  time: number;
  date: number;
  dose: number;
  ratio: number;
}

export default class TimeEntry implements TimeEntryInterface {
  id: number;

  time: number;

  date: number;

  dose: number;

  ratio: number;

  constructor(data: TimeEntryInterface) {
    this.id = data.id;
    this.time = data.time;
    this.date = data.date;
    this.dose = data.dose;
    this.ratio = data.ratio;
  }
}
