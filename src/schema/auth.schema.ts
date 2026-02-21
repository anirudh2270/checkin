import { z } from "zod";
export const ErrorResponseSchema = z.object({
	success: z.literal(false),
	code: z.string(),
	message: z.string(),
});

/**
 * =====================
 * Request Schemas
 * =====================
 */

export const LoginBodySchema = z.object({
	email: z.email("Please enter a valid email address"),
});
export const signupBodySchema = z.object({
	email: z.email("Please enter a valid email address"),
	fullName: z.string().min(2, "Name must be at least 2 characters long"),
});
export const setup2faBodySchema = z.object({
	token: z.string("Invalid token"),
});

/**
 * =====================
 * Response Schemas
 * =====================
 */

export const LoginResponseSchema = z.object({
	email: z.email().optional(),
	next_step: z.string(),
});
export const SignupResponseSchema = z.object({
	next: z.literal("VERIFY_OTP"),
});
export const Setup2faResponseSchema = z.object({
	secret: z.string(),
	qrCode: z.string(),
});

/**
 * =====================
 * Inferred Types
 * =====================
 */

export type LoginBody = z.infer<typeof LoginBodySchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type SignupBody = z.infer<typeof signupBodySchema>;
export type SignupResponse = z.infer<typeof SignupResponseSchema>;
export type Setup2faBody = z.infer<typeof setup2faBodySchema>;
export type Setup2faResponse = z.infer<typeof Setup2faResponseSchema>;

/**
 * =====================
 * Fastify Route Schema
 * =====================
 */

export const loginSchema = {
	body: LoginBodySchema,
	response: {
		200: LoginResponseSchema,
	},
};
export const signupSchema = {
	body: signupBodySchema,
	response: {
		200: SignupResponseSchema,
	},
};
export const setup2faSchema = {
	querystring: setup2faBodySchema,
	response: {
		200: Setup2faResponseSchema,
	},
};
