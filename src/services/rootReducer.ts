// src/services/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import feedsReducer from './slices/feedsSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import ordersReducer from './slices/ordersSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  burgerConstructor: burgerConstructorReducer
  // Add your reducers here
});

export default rootReducer;
