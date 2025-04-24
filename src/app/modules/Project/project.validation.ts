import z from "zod";

const createProjectSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    budget: z.number({ required_error: "Budget is required" }),
    deadline: z
      .string({ required_error: "Deadline is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid deadline date format",
      }),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "CANCELLED"], {
      required_error: "Status is required",
    }),
    clientId: z.string({ required_error: "Client ID is required" }),
  }),
});

const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    budget: z.number().optional(),
    deadline: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid deadline date format",
      }),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  }),
});

export const ProjectValidation = { createProjectSchema, updateProjectSchema };
