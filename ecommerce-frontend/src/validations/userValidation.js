import { z } from "zod";

// Login Sign Up Form Validation
export const RegistrationFromValidation = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .min(3, "Name should have at least 3 characters.")
    .max(40, "Name should not have more than 20 characters"),
  username: z
    .string()
    .min(1, "Username cannot be empty")
    .min(3, "Username should have at least 3 characters.")
    .max(40, "Username should not have more than 20 characters"),
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Invalid Email"),
  password: z
    .string()
    .min(1, "Password cannot be empty")
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const LoginValidation = z.object({
  loginIdentifier: z
    .string()
    .min(1, "Email or Username cannot be empty")
    .refine(
      (value) => /^\S+@\S+\.\S+$/.test(value) || /^[a-zA-Z0-9_]+$/.test(value),
      "Invalid Email or Username"
    ),
  password: z
    .string()
    .min(1, "Password cannot be empty"),
});
