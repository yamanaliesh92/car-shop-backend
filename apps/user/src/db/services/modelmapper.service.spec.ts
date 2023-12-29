import { ModelMapperService } from './modelmapper.service';
describe('modelMapperService', () => {
  let modelMapper: ModelMapperService;

  beforeEach(() => {
    modelMapper: new ModelMapperService();
  });

  it('should map userEntity to user', () => {
    const data = {
      id: 12,
      email: 'yaman@gamil.com',
      password: 'yaman',
      number: 12,
      username: 'yaman',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = modelMapper.toUser(data);

    expect(user).toBeDefined();
    expect(user.email).toEqual(data.email);
    expect(user.password).toEqual(data.password);
    expect(user.username).toEqual(data.username);
  });
});
