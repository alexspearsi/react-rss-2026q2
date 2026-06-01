import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => localStorage.getItem(key) ?? initialValue);

  const setValue = (value: string) => {
    localStorage.setItem(key, value);

    setStoredValue(value);
  };

  return [storedValue, setValue] as const;
}
