interface CreateCarEntityDtoData {
  year: number;
  make: string;

  type: string;

  category: string;
  cylinders: number;
  sell: string;
  img: string;
  price: number;
  userId: number;
  name: string;
  transmission: string;
  carColor: string;
}

export class CreateCarEntityDto {
  year: number;
  make: string;

  transmission: string;
  carColor: string;
  name: string;
  type: string;
  category: string;
  userId: number;
  cylinders: number;
  sell: string;
  img: string;
  price: number;

  constructor(data: CreateCarEntityDtoData) {
    this.cylinders = data.cylinders;
    this.userId = data.userId;
    this.carColor = data.carColor;
    this.transmission = data.transmission;
    this.year = data.year;
    this.img = data.img;
    this.sell = data.sell;
    this.price = data.price;
    this.category = data.category;
    this.type = data.type;
    this.name = data.name;
    this.make = data.make;
  }
}
