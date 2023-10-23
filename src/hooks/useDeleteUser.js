import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser as deleteUserApi } from '../services/apiUsers';

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteUser,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Something wrong happened');
    },
  });

  return { deleteUser, isLoading, error };
}
