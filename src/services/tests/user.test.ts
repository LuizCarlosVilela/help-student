import UserService from '../UserService';
import { User } from '../Controllers/UserController';

describe('Tests User', () => {
  describe('POST USER', () => {
    it('Validation e-mail', async () => {
      const user = {
        email: '',
        username: 'LuizCarlos',
      } as User;
      const response = await UserService.post(user);
      expect(response).toEqual({
        error: 'Usuário inválido',
      });
    });

    it('Validations username', async () => {
      const user = {
        email: 'lcvs1@aluno.ifal.edu.br',
        username: '',
      } as User;
      const response = await UserService.post(user);
      expect(response).toEqual({
        error: 'Usuário inválido',
      });
    });
  });
  describe('GET USER by(EMAIL)', () => {
    it('Validation e-mail', async () => {
      const response = await UserService.get('luizcarlos');
      expect(response).toEqual({
        error: 'E-mail inválido',
      });
    });
  });
});
