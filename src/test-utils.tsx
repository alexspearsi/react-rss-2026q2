import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import countriesReducer from './store/slices/countries-slice';
import submissionsReducer from './store/slices/submitssion-slice';

export function renderWithStore(ui: ReactNode) {
  const testStore = configureStore({
    reducer: {
      countries: countriesReducer,
      submissions: submissionsReducer,
    },
  });

  return render(<Provider store={testStore}>{ui}</Provider>);
}
