import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrdersData } from '../../utils/types';

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', async () => {
  const response = await getFeedsApi();
  // console.log(response.totalToday);
  return response;
});

interface FeedsState {
  data: TOrdersData | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  data: null,
  loading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  }
});

export default feedsSlice.reducer;
