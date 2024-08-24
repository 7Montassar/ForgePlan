export interface project {
  Id: number;
  Name: string;
  Deadline: string;
  Pdf: string;
  Image: string;
}

export enum Tab {
  PDF = "Pdf",
  NOTES = "Notes",
  TASKS = "Tasks",
  GPT = "GPT",
}