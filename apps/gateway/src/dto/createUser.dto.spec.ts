import { CreateUserDto } from './createUser.dto';

describe('CreateUserDto', () => {
  it('it should return the same dto', () => {
    const data = {
      email: 'email@gamil.com',
      password: 'password',
      number: 122312,
      username: 'username',
    };
    const CreateUser = new CreateUserDto(data);
    expect(CreateUser.email).toEqual(data.email);
    expect(CreateUser.password).toEqual(data.password);
    expect(CreateUser.username).toEqual(data.username);
  });
});
