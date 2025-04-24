import z from "zod";

const createClientSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    phone: z.string({ required_error: "Phone is required" }),
    company: z.string().optional(),
    notes: z.string().optional(),
  }),
});

const updateClientSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const ClientValidation = { createClientSchema, updateClientSchema };
