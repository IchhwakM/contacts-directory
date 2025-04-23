import { useQuery } from '@tanstack/react-query';

import { useHttp } from './useHttp';
import { paths } from 'types/swagger';
import { AxiosResponse } from 'axios';

type ResponseBody = paths['/api/Contact']['get']['responses']['200']['content']['application/json'];

export const useGetAllContacts = () => {
  const http = useHttp();

  const query = useQuery(
    { 
      queryKey: ['GetAllContacts'],
      queryFn: (() => http.get<ResponseBody>('/api/Contact')),
      refetchOnWindowFocus: false,
      select: (res: AxiosResponse<ResponseBody> ) => res.data || []
    }
  );

  return query;
};