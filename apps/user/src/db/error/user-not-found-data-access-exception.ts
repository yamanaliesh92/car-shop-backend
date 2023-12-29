import { DataAccessException } from './data-access-exception';

export class UserNotFoundDataAccessException extends DataAccessException {
  constructor(public cause: unknown) {
    super(cause);
  }
}
