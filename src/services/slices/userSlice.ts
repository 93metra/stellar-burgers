// src/services/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';
import { 
  registerUserApi, 
  loginUserApi, 
  getUserApi, 
  updateUserApi, 
  logoutApi 
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: { email: string; name: string; password: string }) => {
    const response = await registerUserApi(userData);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: { email: string; password: string }) => {
    const response = await loginUserApi(loginData);
    return response;
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await getUserApi();
    return response.user; // возвращаем только пользователя
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<{ email: string; name: string; password: string }>) => {
    const response = await updateUserApi(userData);
    return response.user; // возвращаем обновленного пользователя
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    await logoutApi();
    return null; // возвращаем null при успешном выходе
  }
);

interface UserState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      const { refreshToken, accessToken, user } = action.payload;
      
      // Save tokens
      localStorage.setItem('refreshToken', refreshToken);
      setCookie('accessToken', accessToken);

      // Update the user state
      state.loading = false;
      state.user = user; // сохраняем пользователя после регистрации
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Ошибка регистрации';
    })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { refreshToken, accessToken, user } = action.payload;
        
        // Save tokens
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('accessToken', accessToken);
      
        // Update the user state
        state.loading = false;
        state.user = user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка входа';
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // обновляем информацию о пользователе
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки информации о пользователе';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // обновляем информацию о пользователе
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка обновления информации о пользователе';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // сбрасываем пользователя при выходе
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка выхода';
      });
  }
});

export default userSlice.reducer;