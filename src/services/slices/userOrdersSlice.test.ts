// src/services/slices/userOrdersSlice.test.ts
import { expect, test, describe } from '@jest/globals';
import userOrdersSlice, { fetchUserOrders } from './userOrdersSlice';
import { TOrder } from '../../utils/types';

describe('userOrdersSlice', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  test('should set loading to true when fetchUserOrders is pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = userOrdersSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set orders and loading to false when fetchUserOrders is fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: "testId1",
        status: "done",
        name: "Test Order 1",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-02",
        number: 123,
        ingredients: ["ingredient1", "ingredient2"]
      },
      {
        _id: "testId2",
        status: "pending",
        name: "Test Order 2",
        createdAt: "2023-01-03",
        updatedAt: "2023-01-04",
        number: 124,
        ingredients: ["ingredient3", "ingredient4"]
      }
    ];

    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = userOrdersSlice(initialState, action);
    expect(state.orders).toEqual(mockOrders);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when fetchUserOrders is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: error }
    };
    const state = userOrdersSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });
});