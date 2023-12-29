interface CreateUserEntityDtoData {
  email: string;
  password: string;
  number: number;
  username: string;
}
export class CreateUserEntityDto {
  email: string;
  password: string;
  number: number;
  username: string;

  constructor(data: CreateUserEntityDtoData) {
    this.email = data.email;
    this.password = data.password;
    this.username = data.username;
    this.number = data.number;
  }
}
