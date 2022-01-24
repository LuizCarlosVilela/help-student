import AnnonationService from '../AnnonationService';
import { Annotation } from '../Controllers/AnnotationsController';

describe('Tests Annotations', () => {
  describe('POST Annotation', () => {
    it('Validations id', async () => {
      const annotation = {
        id: '',
      } as Annotation;
      const response = await AnnonationService.post('1234', annotation);
      expect(response).toEqual({
        error: 'Anotação inválida',
      });
    });

    it('Validations date', async () => {
      const annotation = {
        id: '1234',
        date: '',
      } as Annotation;
      const response = await AnnonationService.post('1234', annotation);
      expect(response).toEqual({
        error: 'Anotação inválida',
      });
    });

    it('Validations userId', async () => {
      const annotation = {
        id: '1234',
        date: '123',
      } as Annotation;
      const response = await AnnonationService.post('', annotation);
      expect(response).toEqual({
        error: 'Usuário inválido',
      });
    });
  });
  describe('LIST Annotation by(userID)', () => {
    it('Validation userId', async () => {
      const response = await AnnonationService.list('');
      expect(response).toEqual({
        error: 'Usuário inválido',
      });
    });
  });
});
