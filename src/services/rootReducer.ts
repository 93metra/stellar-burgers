// src/services/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import feedsReducer from './slices/feedsSlice';

const rootReducer = combineReducers({
  feeds: feedsReducer
  // Add your reducers here
});

export default rootReducer;
