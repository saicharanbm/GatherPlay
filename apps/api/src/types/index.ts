import z from "zod";
export const signupSchema = z.object({
  username: z.string(),
  password: z.string().min(3).max(15),
  email: z.string().email(),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(15),
});
export const channelSchema = z.object({
  name: z.string(),
  description: z.string(),
  slug: z.string(),
});

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
