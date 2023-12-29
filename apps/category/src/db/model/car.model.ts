interface CarData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  make: string;

  name: string;
  year: number;
  cylinders: number;
  type: string;
  category: string;
  userId: number;
  img: string;
  sell: string;
  price: number;
  transmission: string;
  carColor: string;
}

export class Car {
  #id: number;
  #createdAt: Date;
  #updatedAt: Date;
  #transmission: string;
  #carColor: string;
  #year: number;
  #make: string;
  #name: string;
  #category: string;
  #type: string;
  #userId: number;
  #cylinders: number;
  #img: string;
  #sell: string;
  #price: number;

  get id(): number {
    return this.#id;
  }

  get type(): string {
    return this.#type;
  }

  get img(): string {
    return this.#img;
  }

  get carColor(): string {
    return this.#carColor;
  }

  get transmission(): string {
    return this.#transmission;
  }

  get name(): string {
    return this.#name;
  }

  get sell(): string {
    return this.#sell;
  }

  get price(): number {
    return this.#price;
  }

  get category(): string {
    return this.#category;
  }

  get make(): string {
    return this.#make;
  }

  get userId(): number {
    return this.#userId;
  }

  get cylinders(): number {
    return this.#cylinders;
  }

  get year(): number {
    return this.#year;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  constructor(data: CarData) {
    this.#cylinders = data.cylinders;
    this.#id = data.id;
    this.#category = data.category;
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
    this.#name = data.name;
    this.#type = data.type;
    this.#make = data.make;
    this.#year = data.year;
    this.#carColor = data.carColor;
    this.#transmission = data.transmission;
    this.#userId = data.userId;
    this.#img = data.img;
    this.#price = data.price;
    this.#sell = data.sell;
  }
}
