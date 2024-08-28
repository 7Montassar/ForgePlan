export interface project {
  Id: number;
  Name: string;
  Deadline: string;
  Pdf: string;
  Image: string;
  Collaborators: collaborator[];
}

export enum Tab {
  PDF = "Pdf",
  NOTES = "Notes",
  TASKS = "Tasks",
  GPT = "GPT",
}

export interface task{
  Id: number;
  projectId: number;
  Title: string;
  Description: string;
  // Deadline: {
  //   "Time": string;
  //   "valid": boolean;
  // }
  Completed: boolean;
}

export interface collaborator {
  Id: number;
  Name: string;
  Email: string;
  Tasks : task[];
}