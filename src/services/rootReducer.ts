// src/services/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import feedsReducer from './slices/feedsSlice';
import ingredientsReducer from './slices/ingredientsSlice';

const rootReducer = combineReducers({
  feeds: feedsReducer,
  ingredients: ingredientsReducer
  // Add your reducers here
});

export default rootReducer;
