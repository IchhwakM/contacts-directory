import { createContext } from 'react';

interface Value {
  error: (message: Promise<string> | string) => void;
  success: (message: string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
}

export const SnackbarContext = createContext(null as unknown as Value);
