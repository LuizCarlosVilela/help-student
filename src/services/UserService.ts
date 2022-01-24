import UserController, { User } from './Controllers/UserController';

export default class UserService {
  static async post(user: User) {
    const validation = validationUser(user);

    if (validation?.error) {
      return validation;
    }

    const response = await UserController.post(user);
    if (!response) {
      return { error: 'Aconteceu algum error' };
    }
    return response;
  }

  static async list() {
    const response = await UserController.list();

    if (response) {
      return response;
    }

    return null;
  }

  static async get(email: string) {
    const validation = validationEmail(email);

    if (validation?.error) {
      return validation;
    }

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

function validationEmail(email: string) {
  if (email === '' || email === undefined || !email.includes('@')) {
    return { error: 'E-mail inválido' };
  }
}
