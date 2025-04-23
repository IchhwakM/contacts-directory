import { useMutation } from '@tanstack/react-query';

import { useHttp } from './useHttp';
import { paths } from 'types/swagger';
import { useSnackbar } from 'context/snackbar/useSnackbar';

type RequestParameters = paths['/api/Contact/{id}']['delete']['parameters']['path']['id'];
type ResponseBody = paths['/api/Contact/{id}']['delete']['requestBody'];

export const useDeleteContact = () => {
  const http = useHttp();
  const snackbar = useSnackbar();

  const mutation = useMutation(
    {
      mutationFn: (id: RequestParameters) => http.delete<ResponseBody>(`/api/Contact/${id}`),
      onSuccess: () => snackbar.success('Contact deleted successfully!')
    }
  );

  return mutation;
};
