// src/services/slices/userSlice.test.ts
import { expect, test, describe } from '@jest/globals';
import userSlice, {
  fetchUser,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from './userSlice';
import { TUser } from '../../utils/types';

describe('userSlice', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null
  };

  test('should set loading to true when registerUser is pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set user and loading to false when registerUser is fulfilled', () => {
    const mockUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
        user: mockUser
      }
    };
    const state = userSlice(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when registerUser is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: registerUser.rejected.type,
      error: { message: error }
    };
    const state = userSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });

  test('should set loading to true when loginUser is pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set user and loading to false when loginUser is fulfilled', () => {
    const mockUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
        user: mockUser
      }
    };
    const state = userSlice(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when loginUser is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: loginUser.rejected.type,
      error: { message: error }
    };
    const state = userSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });

  test('should set loading to true when fetchUser is pending', () => {
    const action = { type: fetchUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set user and loading to false when fetchUser is fulfilled', () => {
    const mockUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = {
      type: fetchUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when fetchUser is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: fetchUser.rejected.type,
      error: { message: error }
    };
    const state = userSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });

  test('should set loading to true when updateUser is pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set user and loading to false when updateUser is fulfilled', () => {
    const mockUser: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userSlice(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when updateUser is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: updateUser.rejected.type,
      error: { message: error }
    };
    const state = userSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });

  test('should set loading to true when logoutUser is pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should set user to null and loading to false when logoutUser is fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: null
    };
    const state = userSlice(initialState, action);
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });

  test('should set error and loading to false when logoutUser is rejected', () => {
    const error = 'Test Error';
    const action = {
      type: logoutUser.rejected.type,
      error: { message: error }
    };
    const state = userSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loading).toBe(false);
  });
});
