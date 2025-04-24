import z from "zod";

export const createReminderSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    dueDate: z
      .string({ required_error: "Due date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for due date",
      }),
    message: z.string({ required_error: "Message is required" }),
    clientId: z.string({ required_error: "Client ID is required" }),
    projectId: z.string().optional(),
  }),
});

export const ReminderValidation = {
  createReminderSchema,
};
