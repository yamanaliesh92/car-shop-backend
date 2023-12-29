import { DataApplicationException } from './data-application-exception';

export class UnknownApplicationException extends DataApplicationException {
  constructor(public message: string) {
    super('unKnown error occurred');
  }
}
