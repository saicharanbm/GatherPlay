import z from "zod";
export const signupSchema = z.object({
  fullName: z.string(),
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
  avatarURL: z.string(),
  headerURL: z.string(),
});
export const uploadChannelSchema = z.object({
  avatarName: z.string(),
  avatarType: z.string().includes("image"),
  avatarSize: z
    .number()
    .gte(0)
    .lte(5 * 1024 * 1024),
  headerName: z.string(),
  headerType: z.string().includes("image"),
  headerSize: z
    .number()
    .gte(0)
    .lte(5 * 1024 * 1024),
});

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
