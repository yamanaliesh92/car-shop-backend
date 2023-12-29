interface UpdateUserData {
  id: number;
  username: string;
  number: number;
}

export class UpdateUserCommand {
  id: number;
  username?: string;
  number?: number;

  constructor(data: UpdateUserData) {
    if (data) {
      this.id = data.id;
      this.number = data.number;
      this.username = data.username;
    }
  }
}
