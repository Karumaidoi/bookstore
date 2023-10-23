import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getOAuthToken } from '../services/apiPayment';

export function usePayment() {
  const queryClient = useQueryClient();
  const {
    mutate: makingPayment,
    isLoading,
    error,
  } = useMutation({
    mutationFn: getOAuthToken,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
  });

  return { makingPayment, isLoading, error };
}
