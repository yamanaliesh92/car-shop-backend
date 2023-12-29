interface ChangePasswordCommandData {
  email: string;
  password: string;
}
export class ChangePasswordCommand {
  email: string;
  password: string;

  constructor(data: ChangePasswordCommandData) {
    if (data) {
      this.email = data.email;

      this.password = data.password;
    }
  }
}
