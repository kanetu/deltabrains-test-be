/**
 * @extends Error
 */
class ExtendableError extends Error {
  errors: any;
  status: any;
  isPublic: boolean;

  constructor({ message, errors, status, isPublic, stack }: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
  }
}

export default ExtendableError;
