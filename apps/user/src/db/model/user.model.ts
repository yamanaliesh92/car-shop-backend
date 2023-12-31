import { AggregateRoot } from '@nestjs/cqrs';

interface UserModelData {
  id: number;
  username: string;
  email: string;
  password: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends AggregateRoot {
  #id: number;
  #email: string;
  #password: string;
  #number: number;
  #username: string;
  #createdAt: Date;
  #updatedAt: Date;

  get id(): number {
    return this.#id;
  }

  get email(): string {
    return this.#email;
  }

  get password(): string {
    return this.#password;
  }

  get number(): number {
    return this.#number;
  }

  get username(): string {
    return this.#username;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  constructor(data: UserModelData) {
    super();
    this.#id = data.id;
    this.#email = data.email;
    this.#password = data.password;
    this.#username = data.username;
    this.#number = data.number;
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
  }
}
