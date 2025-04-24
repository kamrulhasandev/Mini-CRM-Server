export interface ICreateProject {
  title: string;
  budget: number;
  deadline: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  clientId: string;
}
