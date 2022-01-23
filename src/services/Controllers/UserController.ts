import { getDocs, addDoc } from 'firebase/firestore/lite';

import { connection } from '../firebase';

export type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

export default class UserController {
  static async post(user: User) {
    const reference = connection('users');
    const response = await addDoc(reference, user);
    return response;
  }

  static async list() {
    const reference = connection('users');
    const response = await getDocs(reference);

    if (response?.docs.length > 0) {
      return response.docs.map((doc) => doc.data());
    }

    return null;
  }

  static async get(email: string) {
    const response = await this.list();
    const filter = response?.filter((user) => user.email === email);

    if (filter && filter?.length > 0) {
      return filter;
    }

    return null;
  }
}
