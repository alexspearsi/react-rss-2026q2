import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { type RenderOptions, render } from '@testing-library/react';

import { ThemeProvider } from './context/ThemeContext';
import { articlesApi } from './store/articlesApi';
import selectedItemsReducer from './store/selectedItemsSlice';
import type { Article } from './types/article';

export function createTestStore(preloadedItems: Article[] = []) {
  return configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
      [articlesApi.reducerPath]: articlesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
    preloadedState: { selectedItems: { items: preloadedItems } },
  });
}

type TestStore = ReturnType<typeof createTestStore>;

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedItems?: Article[];
  store?: TestStore;
}

export function renderWithProviders(
  ui: ReactNode,
  { preloadedItems = [], store, ...options }: RenderWithProvidersOptions = {},
) {
  const testStore = store ?? createTestStore(preloadedItems);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider>
        <Provider store={testStore}>{children}</Provider>
      </ThemeProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...options }), store: testStore };
}
