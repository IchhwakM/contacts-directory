import axios from 'axios';

export const useHttp = () => {
  const client = axios.create();
  client.defaults.baseURL = "https://localhost:44305";

  return client;
};
