import {
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore/lite';

import { connection } from '../firebase';
import { User } from './UserController';

export type Annotation = {
  id: string;
  person: string;
  category: string;
  email: string;
  name: string;
  date: string;
  description: string;
};

export default class AnnotationController {
  static async post(userId: string, annotation: Annotation) {
    try {
      const reference = connection('users');
      const document = doc(reference, userId);
      let user = {} as User;

      const userDoc = await getDoc(document);
      if (userDoc.exists()) {
        user = userDoc.data() as User;
      } else {
        console.log('Usuário não existente');
      }

      const newAnnotations = user.annotations;
      newAnnotations.push(annotation);

      if (document) {
        await updateDoc(document, {
          annotations: newAnnotations,
        });
        return { message: 'Anotação cadastrado com sucesso!' };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async list(userId: string) {
    try {
      const reference = connection('users');

      if (reference) {
        const document = doc(reference, userId);
        let user = {} as User;

        const userDoc = await getDoc(document);
        if (userDoc.exists()) {
          user = userDoc.data() as User;
        } else {
          console.log('Usuário não existente');
        }

        if (user?.annotations?.length > 0) {
          return user.annotations;
        }
      }

      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
