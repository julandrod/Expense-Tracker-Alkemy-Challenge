import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customApiError";

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
