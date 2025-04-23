import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { FC, ReactNode, useCallback, useState } from 'react';

import { SnackbarContext } from './snackbarContext';

interface State {
  open: boolean;
  severity: AlertColor;
  message: string;
}

interface Props {
  children: ReactNode;
}

export const SnackbarProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<State>({
    open: false,
    severity: 'error',
    message: ''
  });

  const onClose = () => {
    setState((state) => ({
      ...state,
      open: false
    }));
  };

  const error = useCallback(
    async (message: string | Promise<string>) => {
      setState({
        open: true,
        severity: 'error',
        message: await message
      });
    },
    [setState]
  );

  const success = useCallback(
    (message: string) => {
      setState({
        open: true,
        severity: 'success',
        message
      });
    },
    [setState]
  );

  const warn = useCallback(
    (message: string) => {
      setState({
        open: true,
        severity: 'warning',
        message
      });
    },
    [setState]
  );

  const info = useCallback(
    (message: string) => {
      setState({
        open: true,
        severity: 'info',
        message
      });
    },
    [setState]
  );

  return (
    <SnackbarContext.Provider value={{ error, success, warn, info }}>
      <Snackbar
        open={state.open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={5000}
        key={Math.random()}
      >
        <Alert severity={state.severity} variant='filled'>
          {state.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};
