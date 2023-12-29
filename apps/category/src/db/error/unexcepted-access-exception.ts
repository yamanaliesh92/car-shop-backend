import { DataAccessException } from './data-access-exception';

export class UnknownDataAccessException extends DataAccessException {
  constructor(public cause: unknown) {
    super(cause);
  }
}
