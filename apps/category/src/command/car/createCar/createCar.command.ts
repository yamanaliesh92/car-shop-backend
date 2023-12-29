interface CreateCarCommandData {
  year: number;
  make: string;
  transmission: string;
  carColor: string;
  type: string;
  cylinders: number;
  userId: number;
  category: string;
  img: string;
  price: number;
  sell: string;
  name: string;
}

export class CreateCarCommand {
  year: number;
  make: string;
  name: string;
  type: string;
  userId: number;
  category: string;
  cylinders: number;
  img: string;
  transmission: string;
  carColor: string;
  price: number;
  sell: string;

  constructor(data: CreateCarCommandData) {
    if (data) {
      this.userId = data.userId;
      this.cylinders = data.cylinders;
      this.type = data.type;
      this.carColor = data.carColor;
      this.transmission = data.transmission;
      this.make = data.make;
      this.category = data.category;
      this.year = data.year;
      this.img = data.img;
      this.price = data.price;
      this.name = data.name;
      this.sell = data.sell;
    }
  }
}
