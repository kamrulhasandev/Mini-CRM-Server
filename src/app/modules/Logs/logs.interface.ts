export interface ICreateLog {
  date: string;
  type: "CALL" | "MEETING" | "EMAIL" | "OTHERS";
  notes: string;
  clientId: string;
  projectId?: string;
}
