import type { PrismaClient } from "@prisma/client";
import "fastify";

declare module "fastify" {
	interface FastifyInstance {
		config: {
			PORT: number;
			JWT_SECRET: string;
		};
		prisma: PrismaClient;
	}
}
