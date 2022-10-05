import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Algo salio mal, por favor intenta de nuevo mas tarde",
  };

  if (err.code && err.code === "23505") {
    const duplicateValue = err.detail.split(" ")[1];
    customError.msg = `El dato ${duplicateValue} se encuentra duplicado`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
