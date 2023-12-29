import { Column, Entity } from 'typeorm';
import { Base } from 'y/shared/shared/base.entity';

interface CarEntityData {
  make: string;
  year: number;
  cylinders: number;
  userId: number;
  carColor: string;
  type: string;
  transmission: string;
  name: string;
  category: string;
  img: string;
  sell: string;
  price: number;
}
@Entity('car')
export class CarEntity extends Base {
  @Column({ type: 'text' })
  make: string;

  @Column({ type: 'text' })
  carColor: string;

  @Column({ type: 'text' })
  transmission: string;

  @Column({ type: 'int4' })
  userId: number;

  @Column({ type: 'float4' })
  cylinders: number;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'int4' })
  year: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  img: string;

  @Column({ type: 'text' })
  sell: string;

  @Column({ type: 'float4' })
  price: number;

  @Column({ type: 'text' })
  type: string;

  constructor(data: CarEntityData) {
    super();
    if (data) {
      this.cylinders = data.cylinders;
      this.userId = data.userId;
      this.make = data.make;
      this.carColor;
      this.category = data.category;
      this.type = data.type;
      this.year = data.year;
      this.carColor = data.carColor;
      this.transmission = data.transmission;
      this.img = data.img;
      this.name = data.name;
      this.price = data.price;
      this.sell = data.sell;
    }
  }
}
