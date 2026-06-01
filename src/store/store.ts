import { configureStore } from '@reduxjs/toolkit';

import { articlesApi } from './articlesApi';
import selectedItemsReducer from './selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
