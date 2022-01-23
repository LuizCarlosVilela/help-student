import UserService from '../UserService';
import { User } from '../Controllers/UserController';

test('Cadastro de usuário - validando e-mail', async () => {
  const user = {
    email: '',
    username: 'LuizCarlos',
  } as User;
  const response = await UserService.post(user);
  expect(response).toEqual({
    error: 'Usuário inválido',
  });
});

test('Cadastro de usuário - validando username', async () => {
  const user = {
    email: 'lcvs1@aluno.ifal.edu.br',
    username: '',
  } as User;
  const response = await UserService.post(user);
  expect(response).toEqual({
    error: 'Usuário inválido',
  });
});
