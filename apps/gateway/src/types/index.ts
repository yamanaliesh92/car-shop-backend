export interface IResponseCreateUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  number: number;
}

export interface IResponseLogin {
  token: string;
}

export interface IResponseCar {
  price: number;
  img: any;
  sell: string;
  createdAt: Date;
  cylinders: number;
  id: number;
  userId: number;
  make: string;
  category: number;
  name: string;
  year: number;
  type: string;
  carColor: string;
  transmission: string;
  updatedAt: Date;
}
