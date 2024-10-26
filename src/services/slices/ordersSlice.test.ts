// src/services/slices/ordersSlice.test.ts
import { expect, test, describe } from '@jest/globals';
import ordersSlice, { fetchOrderByNumber, createOrder } from './ordersSlice';
import { TOrder } from '../../utils/types';

describe('ordersSlice', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null
  };

  test('should set loading to true when fetchOrderByNumber is pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = ordersSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set data and loading to false when fetchOrderByNumber is fulfilled', () => {
    const mockOrder: TOrder = {
      _id: 'testId',
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      number: 123,
      ingredients: ['ingredient1', 'ingredient2']
    };

    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = ordersSlice(initialState, action);
    expect(state.data).toEqual(mockOrder);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when fetchOrderByNumber is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: error }
    };
    const state = ordersSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });

  test('should set loading to true when createOrder is pending', () => {
    const action = { type: createOrder.pending.type };
    const state = ordersSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set data and loading to false when createOrder is fulfilled', () => {
    const mockOrder: TOrder = {
      _id: 'testId',
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      number: 123,
      ingredients: ['ingredient1', 'ingredient2']
    };

    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = ordersSlice(initialState, action);
    expect(state.data).toEqual(mockOrder);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when createOrder is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: createOrder.rejected.type,
      error: { message: error }
    };
    const state = ordersSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });
});
