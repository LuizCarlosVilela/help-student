import UserController, { User } from './Controllers/UserController';

export default class UserService {
  static async post(user: User) {
    const validation = validationUser(user);

    if (validation?.error) {
      return validation?.error;
    }

    await UserController.post(user);
    return { message: 'Usuário cadastrado com sucesso!' };
  }

  static async list() {
    const response = await UserController.list();

    if (response) {
      return response;
    }

    return null;
  }

  static async get(email: string) {
    const response = await UserController.get(email);

    if (response) {
      return response;
    }

    return null;
  }
}

function validationUser(user: User) {
  if (user.email === '' || user.email === undefined) {
    return { error: 'Usuário inválido' };
  } else if (user.username === '' || user.username === undefined) {
    return { error: 'Usuário inválido' };
  }
}
