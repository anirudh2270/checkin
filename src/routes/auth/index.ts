import type { FastifyInstance } from "fastify";
import { login } from "../../services/auth.service.js";
import { loginSchema, type LoginBody } from "../../schema/auth.schema.js";

export default async function (app: FastifyInstance) {
  app.post("/login", { schema: loginSchema }, async (req) => {
    return login(req.body as LoginBody);
  });
}
