interface RefreshTokenData {
  id: number;
}

export class RefreshTokenCommand {
  id: number;

  constructor(data: RefreshTokenData) {
    this.id = data.id;
  }
}
