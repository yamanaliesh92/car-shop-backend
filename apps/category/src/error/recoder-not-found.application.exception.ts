import { DataApplicationException } from './data-application-exception';

export class NotFoundApplicationException extends DataApplicationException {
  constructor(public message: string) {
    super(message);
  }
}
