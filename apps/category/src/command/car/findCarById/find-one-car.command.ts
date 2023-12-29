interface FindOneCarCommandData {
  id: number;
}

export class FindOneCarCommand {
  id: number;

  constructor(data: FindOneCarCommandData) {
    this.id = data.id;
  }
}
