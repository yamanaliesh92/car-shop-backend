import { DataAccessException } from './data-access-exception';

export class UniqueConstraintViolationDataAccessException extends DataAccessException {
  constructor(public cause: unknown) {
    super(cause);
  }
}
