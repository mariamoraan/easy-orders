import { ERROR_CODES } from './error-codes';

export interface CustomError {
  code: string | ERROR_CODES;
  message: string;
}
