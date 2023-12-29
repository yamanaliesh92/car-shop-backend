import { ChangePasswordCommand } from './change-password.command';

describe('changePassworCommand', () => {
  it('it should have the same value', () => {
    const data = {
      email: 'email@gmail.com',
      password: 'password',
    };

    const dto = new ChangePasswordCommand(data);

    expect(dto.email).toEqual(data.email);

    expect(dto.password).toEqual(data.password);
  });
});
