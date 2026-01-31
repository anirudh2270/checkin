import Fastify, { type FastifyError, type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifyAutoload from "@fastify/autoload";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(envPlugin);
  app.register(fastifyHelmet);
  app.register(cors);
  app.register(errorHandlerPlugin);
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
