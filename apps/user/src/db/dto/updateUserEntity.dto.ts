interface UpdateUserEntityDtoData {
  password?: string;
  number?: number;
  username?: string;
}
export class UpdateUserEntityDto {
  password?: string;
  number?: number;
  username?: string;

  constructor(data: UpdateUserEntityDtoData) {
    if (data) {
      this.password = data.password;
      this.username = data.username;
      this.number = data.number;
    }
  }
}
