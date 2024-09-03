const { z } = require('zod');

export const userValidation = z.object({
    name: z.string().min(2, "Name should have at least 2 characters").max(40, "Name should have at max 40 characters"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(6,"Username should have at least 2 characters").max(40, "Name should have at max 40 characters"),
    password: z.string().min(8,"")
}) 