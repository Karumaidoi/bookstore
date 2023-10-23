import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addUsers } from '../services/apiUsers';

export function useCreateNewUser() {
  const {
    mutate: addUserApi,
    isLoading: isAddingUser,
    error,
  } = useMutation({
    mutationFn: addUsers,
    onSuccess: () => {
      toast.success('Email addresss sent for confirmation');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return { addUserApi, isAddingUser, error };
}
