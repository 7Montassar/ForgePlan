export interface project {
  Id: number;
  Name: string;
  Deadline: string;
  Pdf: string;
  Image: string;
}

export interface link {
  name: string;
  // set: React.Dispatch<React.SetStateAction<string>>;
}

export enum Tab {
  PDF = "Pdf",
  NOTES = "Notes",
  TASKS = "Tasks",
  GPT = "GPT",
}