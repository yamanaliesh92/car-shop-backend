export class DataAccessException extends Error {
  errMsg: string;
  cause: unknown;

  constructor(cause: unknown, message?: string) {
    const msg = message ?? `DataAccess error during query to table`;
    super(msg);
    this.errMsg = msg;
    this.cause = cause;
  }
}
