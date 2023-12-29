interface FindCarByUserIdCommandData {
  userId: number;
}
export class FindCarByUserIdCommand {
  userId: number;
  constructor(data: FindCarByUserIdCommandData) {
    this.userId = data.userId;
  }
}
