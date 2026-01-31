import { z } from "zod";

/**
 * =====================
 * Request Schemas
 * =====================
 */

export const LoginBodySchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string("Please enter a valid password")
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include uppercase, lowercase, number, and special character",
    ),
});

/**
 * =====================
 * Response Schemas
 * =====================
 */

export const LoginResponseSchema = z.object({
  email: z.email(),
  token: z.string(),
});

/**
 * =====================
 * Inferred Types
 * =====================
 */

export type LoginBody = z.infer<typeof LoginBodySchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

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
