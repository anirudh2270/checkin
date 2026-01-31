import type { FastifyInstance, FastifyError } from "fastify";
import fp from "fastify-plugin";

function errorHandlerPlugin(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request, reply) => {
    /**
     * 1️⃣ Validation errors
     */
    if (error.validation) {
      return reply.status(400).send({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Invalid request data",
        errors: error.validation.map((issue) => ({
          field: issue.instancePath
            ? issue.instancePath.replace("/", "")
            : "body",
          message: issue.message,
        })),
      });
    }

    /**
     * 2️⃣ Authentication errors
     */
    if (error.statusCode === 401) {
      return reply.status(401).send({
        success: false,
        code: "UNAUTHORIZED",
        message: error.message || "Authentication required",
      });
    }

    /**
     * 3️⃣ Authorization errors
     */
    if (error.statusCode === 403) {
      return reply.status(403).send({
        success: false,
        code: "FORBIDDEN",
        message: error.message || "Access denied",
      });
    }

    /**
     * 4️⃣ Not found
     */
    if (error.statusCode === 404) {
      return reply.status(404).send({
        success: false,
        code: "NOT_FOUND",
        message: "Resource not found",
      });
    }

    /**
     * 5️⃣ Business conflicts
     */
    if (error.statusCode === 409) {
      return reply.status(409).send({
        success: false,
        code: "CONFLICT",
        message: error.message,
      });
    }

    /**
     * 6️⃣ Unexpected errors
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
