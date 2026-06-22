import { configureStore } from '@reduxjs/toolkit';

import { articlesApi } from './articlesApi';
import selectedItemsReducer from './selectedItemsSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
      [articlesApi.reducerPath]: articlesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
