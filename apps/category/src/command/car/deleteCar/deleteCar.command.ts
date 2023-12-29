interface DeleteCarCommandData {
  id: number;
}

export class DeleteCarCommand {
  id: number;

  constructor(data: DeleteCarCommandData) {
    this.id = data.id;
  }
}
