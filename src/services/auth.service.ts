import { type FastifyInstance } from "fastify";
import type {
	LoginBody,
	Setup2faBody,
	SignupBody,
} from "../schema/auth.schema.js";
import { GenerateToken } from "../helpers/helpers.js";
import { AppError } from "../common/errors/errors.js";
import { ERROR_TYPES } from "../common/errors/errorTypes.js";
import type { FastifyReply } from "fastify/types/reply.js";

export async function login(
	body: LoginBody,
	fastify: FastifyInstance,
	reply: FastifyReply,
) {
	const user = await fastify.prisma.user.findFirst({
		where: {
			email: body.email,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404, ERROR_TYPES.NOT_FOUND);
	}

	if (user.authType !== "LOCAL") {
		throw new AppError(
			"User registered with a different authentication method",
			400,
			ERROR_TYPES.BAD_REQUEST,
		);
	}

	if (!user.twoFactorVerified) {
		const token = GenerateToken({
			payload: { email: user.email, fullName: user.name },
			fastify,
			type: "temp",
		});

		reply.setCookie("token", token, {
			path: "/",
			httpOnly: true,
			secure: false,
			maxAge: 3600,
		});

		reply.send({ next_step: "2fa_setup" });
	}
}

export async function signup(
	body: SignupBody,
	fastify: FastifyInstance,
	reply: FastifyReply,
) {
	const token = GenerateToken({
		payload: { email: body.email, fullName: body.fullName },
		fastify,
		type: "temp",
	});

	await fastify.prisma.user.create({
		data: {
			email: body.email,
			name: body.fullName,
			authType: "LOCAL",
			token,
		},
		select: {
			token: true,
		},
	});

	reply.setCookie("token", token, {
		path: "/",
		httpOnly: true,
		secure: false,
		maxAge: 3600,
	});
}

export async function setup2fa(
	query: Setup2faBody,
	fastify: FastifyInstance,
	reply: FastifyReply,
) {}
