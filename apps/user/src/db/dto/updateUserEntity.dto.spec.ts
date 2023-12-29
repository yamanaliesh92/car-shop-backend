import { UpdateUserEntityDto } from './updateUserEntity.dto';

describe('UpdateUserEntityDto', () => {
  it('it have tha same value', () => {
    const date = {
      email: 'email@gmail.com',
      password: 'password',
      number: 12393,
    };
    const dto = new UpdateUserEntityDto(date);
    expect(dto.number).toEqual(date.number);
    expect(dto.password).toEqual(date.password);
  });
});
