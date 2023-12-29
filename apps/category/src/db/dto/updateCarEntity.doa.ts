interface UpdateCarEntityDtoData {
  year?: number;
  make?: string;
  type?: string;
  sell?: string;
  carColor?: string;
  name?: string;
  cylinders?: number;
  category?: string;
  price?: number;
  transmission?: string;
  img?: string;
}

export class UpdateCarEntityDto {
  year?: number;
  make?: string;
  price?: number;
  sell?: string;
  carColor?: string;
  name?: string;
  img?: string;
  type?: string;
  category?: string;
  transmission?: string;
  cylinders?: number;

  constructor(data: UpdateCarEntityDtoData) {
    if (data) {
      this.cylinders = data.cylinders;
      this.transmission = data.transmission;
      this.price = data.price;
      this.name = data.name;
      this.img = data.img;
      this.sell = data.sell;
      this.year = data.year;
      this.carColor = data.carColor;
      this.type = data.type;
      this.make = data.make;
      this.category = data.category;
    }
  }
}
