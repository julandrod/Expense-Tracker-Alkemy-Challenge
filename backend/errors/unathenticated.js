import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customApiError";

class UnathenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnathenticatedError;
