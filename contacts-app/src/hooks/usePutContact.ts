import { useMutation } from '@tanstack/react-query';
import { useHttp } from './useHttp';
import { components } from 'types/swagger';
import { useSnackbar } from 'context/snackbar/useSnackbar';

type RequestBody = components['schemas']['Contact'];
type ResponseBody = '';


export const usePutContact = () => {
  const http = useHttp();
  const snackbar = useSnackbar();

  const mutation = useMutation(
    {
      mutationFn: (body: RequestBody) => http.put<ResponseBody>(`/api/Contact/${body.Id}`, body),
      onSuccess: () => snackbar.success('Contact updated successfully!')
    });

  return mutation;
};
