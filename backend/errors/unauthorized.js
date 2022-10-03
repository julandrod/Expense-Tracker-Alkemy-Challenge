import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customApiError";

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default Unauthorized;
