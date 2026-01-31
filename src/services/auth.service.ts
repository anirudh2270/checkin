import type { LoginBody } from "../schema/auth.schema.js";

export function login(body: LoginBody) {
  return {
    email: body.email,
    token: "jwt-token",
  };
}
