import { ApplicationException } from './application.exception';

export class UnknownApplicationException extends ApplicationException {
  constructor(public cause: unknown) {
    super('unknownError', cause);
  }
}
