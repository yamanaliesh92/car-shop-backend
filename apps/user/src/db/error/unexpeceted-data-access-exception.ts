import { DataAccessException } from './data-access-exception';

export class UnexpectedDataAccessException extends DataAccessException {
  constructor(public readonly cause: unknown) {
    super(cause);
  }
}
