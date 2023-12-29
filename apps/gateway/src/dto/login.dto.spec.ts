import { LoginDto } from './login.dto';

describe('loginDto', () => {
  it('it should return the same dto', () => {
    const data = {
      email: 'email@gamil.com',
      password: 'password',
    };
    const loginDto = new LoginDto(data);
    expect(loginDto.email).toEqual(data.email);
    expect(loginDto.password).toEqual(data.password);
  });
});
