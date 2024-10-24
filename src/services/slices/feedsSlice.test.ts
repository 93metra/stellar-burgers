// src/services/slices/feedsSlice.test.ts
import { expect, test, describe } from '@jest/globals';
import feedsSlice, { fetchFeeds } from './feedsSlice';
import { TOrdersData } from '../../utils/types';

describe('feedsSlice', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null
  };

  test('should set loading to true when fetchFeeds is pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set data and loading to false when fetchFeeds is fulfilled', () => {
    const mockData: TOrdersData = {
      orders: [{
        _id: "testId",
        status: "done",
        name: "Test Order",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-02",
        number: 123,
        ingredients: ["ingredient1", "ingredient2"]
      }],
      total: 1,
      totalToday: 1
    };

    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: mockData
    };
    const state = feedsSlice(initialState, action);
    expect(state.data).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when fetchFeeds is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: error}
    };
    const state = feedsSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });
});