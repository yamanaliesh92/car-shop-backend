interface CarDtoData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  type: string;
  make: string;
  cylinders: number;
  category: string;
  year: number;
  img: string;
  price: number;
  transmission: string;
  carColor: string;
  sell: string;
  name: string;
}

export class CarDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  make: string;
  name: string;
  transmission: string;
  carColor: string;
  category: string;
  type: string;
  cylinders: number;
  year: number;
  userId: number;
  img: string;
  price: number;
  sell: string;

  constructor(data: CarDtoData) {
    this.price = data.price;
    this.img = data.img;
    this.sell = data.sell;
    this.createdAt = data.createdAt;
    this.cylinders = data.cylinders;
    this.id = data.id;
    this.userId = data.userId;
    this.make = data.make;
    this.category = data.category;
    this.name = data.name;
    this.year = data.year;
    this.type = data.type;
    this.carColor = data.carColor;
    this.transmission = data.transmission;
    this.updatedAt = data.updatedAt;
  }
}
