import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(1, { message: "Username filed is required!" }),
  gmail: z.string().min(1, { message: "Gmail filed is required!" }),
  password: z.string().min(1, { message: "Password filed is required!" }),
  avatar: z.string().min(1, { message: "Image filed is required!" }),
});

export const SignInSchema = z.object({
  gmail: z.string().min(1, { message: "Gmail filed is required!" }),
  password: z.string().min(1, { message: "Password filed is required!" }),
});
