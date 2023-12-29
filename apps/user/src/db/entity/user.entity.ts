import { Column, Entity } from 'typeorm';
import { Base } from 'y/shared/shared/base.entity';

interface UserEntityData {
  email: string;
  password: string;
  username: string;
  number: number;
}

@Entity('user')
export class UserEntity extends Base {
  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'int4' })
  number: number;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  username: string;

  constructor(data: UserEntityData) {
    super();
    if (data) {
      this.email = data.email;
      this.password = data.password;
      this.username = data.username;
      this.number = data.number;
    }
  }
}
