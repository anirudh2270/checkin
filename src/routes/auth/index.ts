import { fastify, type FastifyInstance } from "fastify";
import { login, setup2fa, signup } from "../../services/auth.service.js";
import {
	loginSchema,
	setup2faSchema,
	signupSchema,
	type LoginBody,
	type Setup2faBody,
	type SignupBody,
} from "../../schema/auth.schema.js";

export default async function (app: FastifyInstance) {
	app.post("/login", { schema: loginSchema }, async (req, reply) => {
		return login(req.body as LoginBody, app, reply);
	});

	app.get("/setup_2fa", { schema: setup2faSchema }, async (req, reply) => {
		return setup2fa(req.body as Setup2faBody, app, reply);
	});

	app.post("/signup", { schema: signupSchema }, async (req, reply) => {
		return signup(req.body as SignupBody, app, reply);
	});
}
