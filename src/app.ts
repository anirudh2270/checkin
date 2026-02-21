import Fastify, { type FastifyError, type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifyAutoload from "@fastify/autoload";
import fastifyJwt from "@fastify/jwt";
import "dotenv/config";
import path from "path";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fileURLToPath } from "url";
import errorHandlerPlugin from "./plugins/errorHnadler.js";
import envPlugin from "./plugins/env.js";
import fastifyHelmet from "@fastify/helmet";
import prismaPlugin from "./plugins/prisma.js";
import { LoadEnvVariable } from "./helpers/helpers.js";
import fastifyCookie from "@fastify/cookie";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildApp(): FastifyInstance {
	const app = Fastify({
		logger: {
			level: "info",
			transport: {
				target: "pino-pretty",
				options: {
					colorize: true,
					translateTime: "HH:MM:ss",
					ignore: "pid,hostname",
				},
			},
		},
	}).withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(errorHandlerPlugin);
	app.register(fastifyJwt, {
		secret: LoadEnvVariable("JWT_SECRET"),
	});
	app.register(fastifyCookie, { secret: LoadEnvVariable("JWT_SECRET") });
	app.register(envPlugin);
	app.register(prismaPlugin);
	app.register(fastifyHelmet);
	app.register(cors, {
		credentials: true,
		origin: LoadEnvVariable("CORS_ORIGIN"),
	});
	app.register(fastifyAutoload, {
		dir: path.join(__dirname, "routes/auth"),
		options: { prefix: "/api/auth" },
	});
	app.register(fastifyAutoload, {
		dir: path.join(__dirname, "routes/health"),
		options: { prefix: "/api/health" },
	});

	return app;
}
