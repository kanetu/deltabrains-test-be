import httpStatus from "http-status";
import ExtendableError from "./extendable-error";

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }: any) {
    super({
      message, errors, status, isPublic, stack,
    });
  }
}

export default APIError;
