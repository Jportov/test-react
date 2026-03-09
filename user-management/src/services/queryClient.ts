import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos — dados ficam "frescos" por 5min
      retry: 1, // tenta 1 vez se falhar
    },
  },
});