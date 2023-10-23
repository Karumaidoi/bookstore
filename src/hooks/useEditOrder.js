import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '../services/apiOrders';

export function useEditOrder() {
  const queryClient = useQueryClient();
  const {
    mutate: editingOrder,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (newOrder, orderId) => updateOrder(newOrder, orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      toast.success('Order updated successfully');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return { editingOrder, isLoading, error };
}
