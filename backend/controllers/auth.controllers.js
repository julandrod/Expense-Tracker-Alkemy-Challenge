import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { getUserByEmailDb, insertUserDb } from "../models/users.js";
import createUserPayload from "../utils/createUserPayload.js";
import { comparePassword, encryptPassword } from "../utils/encryptPassword.js";
import formatUsername from "../utils/formatUsername.js";
import { createJWT } from "../utils/jwt.js";
import validateEmail from "../utils/validateEmail.js";

export const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new BadRequestError("Debes ingresar nombre, email y password");
  }

  if (!validateEmail(email)) {
    throw new BadRequestError("Por favor ingrese un email valido");
  }

  req.body.name = formatUsername(name);
  req.body.password = await encryptPassword(password);
  const newUser = await insertUserDb(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Nuevo usuario registrado", user: newUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Por favor ingrese email y contraseña");
  }

  const userFound = await getUserByEmailDb(email);
  if (!userFound) {
    throw new UnauthenticatedError("Datos de acceso invalidos");
  }

  const isPasswordCorrect = await comparePassword(password, userFound.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Datos de acceso invalidos");
  }

  const userInfo = createUserPayload(userFound);
  const token = createJWT({ payload: userInfo });

  res.status(StatusCodes.CREATED).json({ user: userInfo, token });
};
