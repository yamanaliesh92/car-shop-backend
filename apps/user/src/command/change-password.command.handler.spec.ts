import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { UserDoa } from '../db/doa/user.doa';
import { mockChangePasswordCommand } from '../mock/data';
import { Bcrypt } from '../shared/bc.service';
import { ChangePasswordCommandHandler } from './chnage-password.command.handler';

describe('change_password', () => {
  let changeComHan: ChangePasswordCommandHandler;
  let bc: Bcrypt;
  let userdoa: UserDoa;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useFactory: createMock },
        { provide: Bcrypt, useFactory: createMock },

        ChangePasswordCommandHandler,
      ],
    }).compile();

    userdoa = await app.resolve<UserDoa>(UserDoa);

    bc = await app.resolve<Bcrypt>(Bcrypt);
    changeComHan = await app.resolve<ChangePasswordCommandHandler>(
      ChangePasswordCommandHandler,
    );
  });

  describe('changePassword', () => {
    it('change password is done', async () => {
      const body = mockChangePasswordCommand();
      const hashPassword = 'jdjjfdsskdakd12424221441';
      jest.spyOn(userdoa, 'update').mockResolvedValue(true);
      jest.spyOn(bc, 'hashPassword').mockResolvedValue(hashPassword);

      const result = await changeComHan.execute(body);
      console.log('Res', result);
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
    });

    it('change password is done', async () => {
      const body = mockChangePasswordCommand();
      const hashPassword = 'jdjjfdsskdakd12424221441';
      jest.spyOn(userdoa, 'update').mockRejectedValue(false);
      jest.spyOn(bc, 'hashPassword').mockResolvedValue(hashPassword);

      const result = await changeComHan.execute(body);
      console.log('Res', result);
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
    });
  });
});
