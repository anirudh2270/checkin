import * as z from "zod";

export const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});
export const signupSchema = z.object({
	fullName: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email address"),
});
