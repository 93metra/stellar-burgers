// src/services/slices/burgerConstructorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        ingredient => ingredient.id !== action.payload
      );
    },
    moveIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredient = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragIngredient);
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { addIngredient, removeIngredient, moveIngredient, resetConstructor } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;