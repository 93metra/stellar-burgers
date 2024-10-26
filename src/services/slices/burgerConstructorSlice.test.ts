// src/services/slices/burgerConstructorSlice.test.ts
import { expect, test, describe } from '@jest/globals';
import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '../../utils/types';

describe('burgerConstructorSlice reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  // Мок-данные для тестов
  const mockBun: TConstructorIngredient = {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: '1'
  };

  const mockIngredient: TConstructorIngredient = {
    _id: '60d3b41abdacab0026a733cc',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    id: '2'
  };

  test('add bun', () => {
    const action = addIngredient(mockBun);
    const newState = reducer(initialState, action);

    expect(newState.bun).toEqual(mockBun);
    expect(newState.ingredients).toEqual([]);
  });

  test('add ingredient', () => {
    const action = addIngredient(mockIngredient);
    const newState = reducer(initialState, action);

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([mockIngredient]);
  });

  test('remove ingredient', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [mockIngredient]
    };

    const action = removeIngredient(mockIngredient.id);
    const newState = reducer(stateWithIngredient, action);

    expect(newState.ingredients).toEqual([]);
  });

  test('move ingredient', () => {
    const mockIngredient2: TConstructorIngredient = {
      ...mockIngredient,
      id: '3',
      name: 'Второй ингредиент'
    };

    const stateWithIngredients = {
      bun: null,
      ingredients: [mockIngredient, mockIngredient2]
    };

    const action = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
    const newState = reducer(stateWithIngredients, action);

    expect(newState.ingredients).toEqual([mockIngredient2, mockIngredient]);
  });
});
