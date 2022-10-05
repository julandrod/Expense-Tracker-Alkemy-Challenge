import UnauthenticatedError from "../errors/unauthenticated.js";
import { isTokenValid } from "../utils/jwt.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No hay un token presente");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = isTokenValid({ token });
    req.user = { ...decoded };
    next();
  } catch (error) {
    throw new UnauthenticatedError("El token no es valido");
  }
};
