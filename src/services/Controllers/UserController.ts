import { getDocs, addDoc, setDoc, doc } from 'firebase/firestore/lite';
import { Annotation } from './AnnotationsController';
import { connection } from '../firebase';

export type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
  annotations: Annotation[];
};

export default class UserController {
  static async post(user: User) {
    try {
      const reference = connection('users');
      const document = doc(reference, user.id);

      if (document) {
        const response = await setDoc(document, user);
        return response;
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async list() {
    const reference = connection('users');

    if (reference) {
      const response = await getDocs(reference);

      if (response?.docs.length > 0) {
        return response.docs.map((doc) => doc.data());
      }
    }

    return null;
  }

  static async get(email: string) {
    const response = await this.list();

    if (response) {
      const filter = response?.filter((user) => user.email === email);

      if (filter && filter?.length > 0) {
        return filter;
      }
    }

    return null;
  }
}
