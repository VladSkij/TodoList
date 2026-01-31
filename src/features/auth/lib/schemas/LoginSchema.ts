import { z } from "zod"



export const loginSchema = z.object({
  email: z.email({ error: "Incorrect email address" }),
  password: z.string().min(7, "Password must be at least 7 characters"),
  rememberMe: z.boolean(),
})


export type LoginInputs = z.infer<typeof loginSchema>