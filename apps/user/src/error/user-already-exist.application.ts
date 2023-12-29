import { ApplicationException } from './application.exception';

export class UserAlreadyExistApplicationException extends ApplicationException {
  constructor() {
    super('user Already exist');
  }
}
