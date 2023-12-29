interface FindCarByCategoryCommandData {
  category: string;
}
export class FindCarByCategoryCommand {
  category: string;
  constructor(data: FindCarByCategoryCommandData) {
    this.category = data.category;
  }
}
