import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Article } from '../types/article';

interface SelectedItemsState {
  items: Article[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<Article>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { toggleItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
