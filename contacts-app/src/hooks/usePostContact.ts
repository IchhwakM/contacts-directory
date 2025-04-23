import { useMutation } from '@tanstack/react-query';

import { useHttp } from './useHttp';
import { components } from 'types/swagger';
import { useSnackbar } from 'context/snackbar/useSnackbar';

type RequestBody = components['schemas']['Contact'];
type ResponseBody = '';

export const usePostContact = () => {
  const http = useHttp();
  const snackbar = useSnackbar();

  const mutation = useMutation(
    {
      mutationFn: (body: RequestBody) => http.post<ResponseBody>('/api/Contact', body),
      onSuccess: () => snackbar.success('New contact added successfully!')
  });

return mutation;
};
