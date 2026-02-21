import type { FastifyInstance, FastifyError } from "fastify";
import fp from "fastify-plugin";
import { Prisma } from "@prisma/client";
import { MakeFirstLetterCapital } from "../helpers/helpers.js";
import { AppError } from "../common/errors/errors.js";

function errorHandlerPlugin(app: FastifyInstance) {
	app.setErrorHandler((error: FastifyError, request, reply) => {
		/**
		 * 0️⃣ DOMAIN ERRORS (Handle First)
		 */
		if (error instanceof AppError) {
			return reply.status(error.statusCode).send({
				success: false,
				code: error.code,
				message: error.message,
			});
		}
		/**
		 * 1️⃣ Validation errors (Zod / Fastify schema)
		 */
		if ((error as any).validation) {
			return reply.status(400).send({
				success: false,
				code: "VALIDATION_ERROR",
				message: "Invalid request data",
				errors: (error as any).validation.map((issue: any) => ({
					field: issue.instancePath
						? issue.instancePath.replace("/", "")
						: "body",
					message: issue.message,
				})),
			});
		}

		/**
		 * 2️⃣ Prisma errors
		 */
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			// Unique constraint (e.g. email already exists)
			if (error.code === "P2002") {
				const fields =
					(error.meta?.target as string[]) ??
					(error.meta?.driverAdapterError?.cause?.constraint
						?.fields as string[]) ??
					[];

				request.log.warn({ fields }, "Prisma unique constraint violation");

				return reply.status(409).send({
					success: false,
					code: "CONFLICT",
					message: `${MakeFirstLetterCapital(fields[0] ?? "Field")} already exists`,
				});
			}

			// Record not found
			if (error.code === "P2025") {
				return reply.status(404).send({
					success: false,
					code: "NOT_FOUND",
					message: "Resource not found",
				});
			}
		}

		/**
		 * 3️⃣ Authentication errors
		 */
		if (error.statusCode === 401) {
			return reply.status(401).send({
				success: false,
				code: "UNAUTHORIZED",
				message: error.message || "Authentication required",
			});
		}

		/**
		 * 4️⃣ Authorization errors
		 */
		if (error.statusCode === 403) {
			return reply.status(403).send({
				success: false,
				code: "FORBIDDEN",
				message: error.message || "Access denied",
			});
		}

		/**
		 * 5️⃣ Not found
		 */
		if (error.statusCode === 404) {
			return reply.status(404).send({
				success: false,
				code: "NOT_FOUND",
				message: "Resource not found",
			});
		}

		/**
		 * 6️⃣ Business conflicts (manual throws)
		 */
		if (error.statusCode === 409) {
			return reply.status(409).send({
				success: false,
				code: "CONFLICT",
				message: error.message,
			});
		}

		/**
		 * 7️⃣ Unexpected errors (last line of defense)
		 */
		request.log.error(error);

		return reply.status(500).send({
			success: false,
			code: "INTERNAL_SERVER_ERROR",
			message: "Something went wrong",
		});
	});
}

export default fp(errorHandlerPlugin);
