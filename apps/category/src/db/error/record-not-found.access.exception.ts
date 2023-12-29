import { DataAccessException } from './data-access-exception';

export class RecodedNotFoundExceptionError extends DataAccessException {
  constructor(public cause: unknown) {
    super(cause);
  }
}
