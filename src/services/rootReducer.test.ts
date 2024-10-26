// src/services/rootReducer.test.ts
import { expect, test, describe } from '@jest/globals';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  test('return correct initial state', () => {
    const initialState = rootReducer(undefined, { type: '' });
    expect(initialState).toEqual({
      feeds: {
        data: null,
        loading: false,
        error: null
      },
      ingredients: {
        data: null,
        loading: false,
        error: null
      },
      orders: {
        data: null,
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        user: null,
        loading: false,
        error: null
      },
      userOrders: {
        orders: [],
        loading: false,
        error: null
      }
    });
  });

  test('handle unknown action', () => {
    const initialState = rootReducer(undefined, { type: '' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });
});
