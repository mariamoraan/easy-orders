import { CustomError } from './error';
import { ERROR_CODES } from './error-codes';

export class AuthError implements CustomError {
  code: string | ERROR_CODES;
  message: string;

  constructor(code: string | ERROR_CODES, message: string) {
    (this.code = code), (this.message = message);
  }
}
