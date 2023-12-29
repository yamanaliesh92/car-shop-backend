interface GetOneUserCommandData {
  id: number;
}

export class GetOneUserCommand {
  id: number;

  constructor(data: GetOneUserCommandData) {
    if (data) {
      this.id = data.id;
    }
  }
}
