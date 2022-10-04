import UnathenticatedError from "../errors/unathenticated";
import { isTokenValid } from "../utils/jwt";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnathenticatedError("No hay un token presente");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = isTokenValid({ token });
    req.user = { ...decoded };
    next();
  } catch (error) {
    throw new UnathenticatedError("El token no es valido");
  }
};
