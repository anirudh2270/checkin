import type { FastifyInstance } from "fastify";
import type { Algorithm } from "jsonwebtoken";

export function MakeFirstLetterCapital(params: string) {
	if (!params) return "";
	return params.charAt(0).toUpperCase() + params.slice(1);
}

export function LoadEnvVariable(params: string) {
	const value = process.env[params];
	if (!value) {
		throw new Error(`Missing environment variable: ${params}`);
	}
	return value;
}

export function GenerateToken({
	payload,
	fastify,
	type,
}: {
	payload: any;
	fastify: FastifyInstance;
	type: "temp" | "permanent";
}) {
	const token = fastify.jwt.sign(
		{
			...payload,
		},
		{
			expiresIn:
				type === "temp"
					? LoadEnvVariable("JWT_TEMP_EXPIRES_IN")
					: LoadEnvVariable("JWT_EXPIRES_IN"),
			algorithm: LoadEnvVariable("JWT_ALGORITHM") as Algorithm,
		},
	);

	return token;
}
