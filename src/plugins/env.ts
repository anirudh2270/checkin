import fp from "fastify-plugin";
import env from "@fastify/env";

const EnvSchema = {
  type: "object",
  required: ["PORT", "JWT_SECRET"],
  properties: {
    PORT: { type: "number" },
    JWT_SECRET: { type: "string" },
  },
};

export default fp(async (app) => {
  await app.register(env, {
    schema: EnvSchema,
    dotenv: true,
  });
});
