import { useContext } from 'react';
import { SnackbarContext } from './snackbarContext';

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('Beyond "SnackbarProvider"!');
  }

  return context;
};
