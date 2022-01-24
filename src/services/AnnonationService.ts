import AnnotationsController, {
  Annotation,
} from './Controllers/AnnotationsController';

export default class AnnonationService {
  static async post(userId: string, annotation: Annotation) {
    const validation = validationAnnontation(userId, annotation);

    if (validation?.error) {
      return validation;
    }

    const response = await AnnotationsController.post(userId, annotation);
    if (!response) {
      return { error: 'Aconteceu algum error' };
    }
    return response;
  }

  static async list(userId: string) {
    if (userId === '' || userId === undefined) {
      return { error: 'Usuário inválido' };
    }

    const response = await AnnotationsController.list(userId);
    if (!response) {
      return { error: 'Aconteceu algum error' };
    }

    return response;
  }
}

function validationAnnontation(userId: string, annotation: Annotation) {
  if (annotation) {
    if (annotation.id === '' || annotation.id === undefined) {
      return { error: 'Anotação inválida' };
    } else if (annotation.date === '' || annotation.date === undefined) {
      return { error: 'Anotação inválida' };
    }
  }

  if (userId === '' || userId === undefined) {
    return { error: 'Usuário inválido' };
  }
}
