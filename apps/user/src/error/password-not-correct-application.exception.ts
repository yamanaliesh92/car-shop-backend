import { ApplicationException } from './application.exception';

export class PasswordIsNotCorrectApplicationException extends ApplicationException {
  constructor() {
    super('password or email is not correct');
  }
}
