export interface ICreateReminder {
    title: string;
    dueDate: string; 
    message: string;
    clientId: string;
    projectId?: string;
  }
  