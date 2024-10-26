// src/services/slices/ingredientsSlice.test.ts
import { expect, test, describe } from '@jest/globals';
import ingredientsSlice, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null
  };

  test('should set loading to true when fetchIngredients is pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set data and loading to false when fetchIngredients is fulfilled', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Test Ingredient',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 10,
        price: 10,
        image: 'test-image',
        image_large: 'test-image-large',
        image_mobile: 'test-image-mobile'
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };
    const state = ingredientsSlice(initialState, action);
    expect(state.data).toBe(ingredients);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when fetchIngredients is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: error }
    };
    const state = ingredientsSlice(initialState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});
