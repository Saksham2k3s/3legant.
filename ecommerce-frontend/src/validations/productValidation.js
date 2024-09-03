import { z } from "zod";

export const newProductValidation = z.object({
    name: z
    .string()
    .min(1, "Name cannot be empty")
    .min(3, "Name should have at least 3 characters.")
    .max(40, "Name should not have more than 20 characters"),
})
