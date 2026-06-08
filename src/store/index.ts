import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from './slices/countries-slice';
import submissionsReducer from './slices/submitssion-slice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    submissions: submissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
