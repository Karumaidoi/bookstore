import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '../../services/apiOrders';

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: data, error } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      toast.success('Order deleted successfully');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return { data, error };
}
