import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from './context/ThemeContext';
import selectedItemsReducer from './store/selectedItemsSlice';
import type { Article } from './types/article';
import type { ReactNode } from 'react';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedItems?: Article[];
}

export function renderWithProviders(
  ui: ReactNode,
  { preloadedItems = [], ...options }: RenderWithProvidersOptions = {},
) {
  const testStore = configureStore({
    reducer: { selectedItems: selectedItemsReducer },
    preloadedState: { selectedItems: { items: preloadedItems } },
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider>
        <Provider store={testStore}>{children}</Provider>
      </ThemeProvider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...options }), store: testStore };
}
