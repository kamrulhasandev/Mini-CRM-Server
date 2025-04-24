import z from "zod";

const createLogSchema = z.object({
  body: z.object({
    date: z
      .string({ required_error: "Date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    type: z.enum(["CALL", "MEETING", "EMAIL", "OTHERS"], {
      required_error: "Interaction type is required",
    }),
    notes: z
      .string({ required_error: "Notes are required" })
      .min(1, "Notes cannot be empty"),
    clientId: z.string({ required_error: "Client ID is required" }),
    projectId: z.string().optional(),
  }),
});

export const LogsValidation = { createLogSchema };
