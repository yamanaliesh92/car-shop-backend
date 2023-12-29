interface CreateUserCommandData {
  email: string;
  password: string;
  username: string;
  number: number;
}

export class CreateUserCommand {
  email: string;
  password: string;
  username: string;
  number: number;

  constructor(data: Partial<CreateUserCommand>) {
    Object.assign(this, data);
    // this.email = data.email;
    // this.number = data.number;
    // this.password = data.password;
    // this.username = data.username;
  }
}
