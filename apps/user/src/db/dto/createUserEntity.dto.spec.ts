import { CreateUserEntityDto } from './createUserEntity.dto';

describe('createCarEntityDto', () => {
  it('create should instance of createUserEntityDto', () => {
    const data = {
      email: 'yaman@gamil.com',
      password: 'yaman12',
      number: 1212,
      username: 'yaman',
    };

    const dto = new CreateUserEntityDto(data);

    expect(dto).toBeDefined();
    expect(data.number).toEqual(dto.number);
    expect(data.username).toEqual(dto.username);
    expect(data.password).toEqual(dto.password);
    expect(data.email).toEqual(dto.email);
  });
});
