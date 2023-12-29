interface UpdateImgCommandData {
  img: string;
  id: number;
}
export class UpdateImgCommand {
  img: string;
  id: number;
  constructor(data: UpdateImgCommandData) {
    if (data) {
      this.img = data.img;
      this.id = data.id;
    }
  }
}
