// src/services/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import feedsReducer from './slices/feedsSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import ordersReducer from './slices/ordersSlice';

const rootReducer = combineReducers({
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer
  // Add your reducers here
});

export default rootReducer;
