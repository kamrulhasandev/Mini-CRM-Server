import z from "zod";

const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Please provide a valid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export const AuthValidation = { loginUserSchema };
