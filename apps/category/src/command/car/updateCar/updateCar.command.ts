interface UpdateCarCommandData {
  id: number;
  year?: number;
  make?: string;
  transmission?: string;
  carColor?: string;
  type?: string;
  cylinders?: number;

  category?: string;

  price?: number;
  sell?: string;
  name?: string;
  img?: string;
}

export class UpdateCarCommand {
  id: number;
  year?: number;
  price?: number;
  sell?: string;
  name?: string;
  carColor?: string;
  make?: string;
  type?: string;
  transmission?: string;
  cylinders?: number;
  category?: string;

  constructor(data: UpdateCarCommandData) {
    if (data) {
      this.id = data.id;
      this.cylinders = data.cylinders;
      this.type = data.type;
      this.year = data.year;
      this.make = data.make;
      this.name = data.name;
      this.transmission = data.transmission;
      this.category = data.category;
      this.carColor = data.carColor;
      this.category = data.category;
      this.price = data.price;
      this.sell = data.sell;
    }
  }
}
