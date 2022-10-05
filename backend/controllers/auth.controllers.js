import BadRequestError from "../errors/bad-request.js";
import { insertUserDb } from "../models/users.js";
import { encryptPassword } from "../utils/encryptPassword.js";
import formatUsername from "../utils/formatUsername.js";
import validateEmail from "../utils/validateEmail.js";

export const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!validateEmail(email)) {
    throw new BadRequestError("Por favor ingrese un email valido");
  }

  if (!email || !name || !password) {
    throw new BadRequestError("Debes ingresar nombre, email y password");
  }

  req.body.name = formatUsername(name);
  req.body.password = await encryptPassword(password);
  const newUser = await insertUserDb(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Nuevo usuario registrado", user: newUser });
};
